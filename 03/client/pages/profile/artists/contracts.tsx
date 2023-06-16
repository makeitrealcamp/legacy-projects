import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '../../../components/Layout';
import styles from '../../../styles/ArtistsContracts.module.scss';
import { ConnectionsProps } from '../client/connections';
import { Accordion, Text, Button, UnstyledButton } from '@mantine/core';
import { acceptContract } from '../../../lib/contracts';
import Cookies from 'js-cookie';
import { IconCheck, IconBug, IconChevronLeft } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';

interface ContractsArtistsProps extends ConnectionsProps {}

export default function ContractsArtists({ user }: ContractsArtistsProps) {
  const token = Cookies.get('sillusr');
  const router = useRouter();
  return (
    <Layout>
      <div className={styles.artistsContractsContainer}>
        <UnstyledButton mb={20} onClick={() => router.push('/profile/artists')}>
          <IconChevronLeft size={40} />
        </UnstyledButton>
        <Text
          component='span'
          align='center'
          variant='gradient'
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          size={50}
          weight={700}
          style={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
          Contracts
        </Text>
        <Accordion variant='contained' radius='md'>
          {user.contracts.length > 0 ? (
            user.contracts.map((contract) => {
              const day = new Date(contract.schedule).getDate();
              const month = new Date(contract.schedule).getMonth() + 1;
              const year = new Date(contract.schedule).getFullYear();
              return (
                <Accordion.Item
                  value={contract.contractName}
                  key={contract._id}
                >
                  <Accordion.Control>{contract.contractName}</Accordion.Control>
                  <Accordion.Panel>
                    <div className={styles.infoContract}>
                      <Text>
                        Date: {day} / {month} / {year}
                      </Text>
                      <Text>
                        Rehearsals: {contract.rehearsalSchedule.length}
                      </Text>
                      <Button
                        onClick={async () => {
                          try {
                            await acceptContract(contract._id, {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            });
                            showNotification({
                              id: 'load-data-contract',
                              color: 'teal',
                              title: 'Contract was updated successfully',
                              message:
                                'Notification will close in 4 seconds, you can close this notification now.',
                              icon: <IconCheck size={16} />,
                              autoClose: 4000,
                            });
                            router.push('/profile/artists');
                          } catch {
                            showNotification({
                              id: 'load-data-contract',
                              color: 'red',
                              title:
                                'Contract could not been updated, try again',
                              message:
                                'Notification will close in 4 seconds, you can close this notification now',
                              icon: <IconBug size={16} />,
                              autoClose: 4000,
                            });
                          }
                        }}
                      >
                        Accept contract
                      </Button>
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })
          ) : (
            <Text>There are not contracts</Text>
          )}
        </Accordion>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['sillusr'];
  let userData;
  if (token) {
    const res = await fetch(
      `${process.env.HEROKU_BACKEND_URI}/api/users/datauser`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    userData = await res.json();
  }
  return {
    props: { user: userData.data },
  };
};
