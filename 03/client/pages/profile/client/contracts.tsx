import Layout from '../../../components/Layout';
import ClientLayout from '../../../components/ClientLayout';
import styles from '../../../styles/ContractsPage.module.scss';
import { Button, Divider, Text, Accordion } from '@mantine/core';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { ConnectionsProps } from './connections';
import { deleteContract } from '../../../lib/contracts';
import Cookies from 'js-cookie';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconBug } from '@tabler/icons';
import { useState } from 'react';

interface ContractsProps extends ConnectionsProps {}

export default function Contracts({ user }: ContractsProps) {
  const router = useRouter();
  const token = Cookies.get('sillusr');

  const namesOfContractsToRender: string[] = [];
  let prevName = 'name';
  if (user) {
    for (let i = 0; i < user.contracts.length; i++) {
      let nextName = user.contracts[i].contractName;
      if (nextName !== prevName) {
        namesOfContractsToRender.push(nextName);
        prevName = nextName;
      }
    }
  }
  const [namesOfContracts, setNamesOfContracts] = useState<string[]>(
    namesOfContractsToRender
  );

  const openModal = (contractId: string) =>
    openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size='sm'>
          Are you sure you want to delete the contract?. There are not refounds
          in case the contract does not finished yet.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () =>
        showNotification({
          id: 'Canceleddeletecontract',
          color: 'teal',
          title: 'Contract will stay in your profile',
          message:
            'Notification will close in 4 seconds, you can close this notification now.',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        }),
      onConfirm: async () => {
        try {
          const res = await deleteContract(contractId, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const newContracts = namesOfContracts.filter(
            (item) => item !== res.data.contractName
          );
          setNamesOfContracts(newContracts);
          showNotification({
            id: 'deletecontract',
            color: 'teal',
            title: 'Contract was deleted successfully',
            message:
              'Notification will close in 4 seconds, you can close this notification now.',
            icon: <IconCheck size={16} />,
            autoClose: 4000,
          });
        } catch {
          showNotification({
            id: 'deletecontract',
            color: 'red',
            title: 'Contract could not been deleted',
            message:
              'Notification will close in 4 seconds, you can close this notification now',
            icon: <IconBug size={16} />,
            autoClose: 4000,
          });
        }
      },
    });

  return (
    <Layout title={`Sillevon | Contracts`}>
      <ClientLayout>
        <div className={styles.contractsContainer}>
          <div className={styles.headerContainers}>
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
            <Button onClick={() => router.push('/stepper-contract')}>
              New contract
            </Button>
          </div>
          <Divider mt={20} mb={20} />
          <div>
            <Accordion variant='contained' radius='md'>
              {namesOfContracts.length > 0 ? (
                namesOfContracts.map((item) => {
                  const currentContracts = user.contracts.filter(
                    (contract) => contract.contractName === item
                  );
                  const isInProccess = currentContracts.every(
                    (contract) => contract.isAccepted === true
                  );
                  const process = isInProccess ? 'ReadyToPay' : 'In process...';
                  const isPaid = currentContracts.every(
                    (contract) => contract.isPaid === true
                  );
                  return (
                    <Accordion.Item value={item} key={item}>
                      <Accordion.Control>
                        <Text>Name: {item}</Text>
                        <Text>Status: {isPaid ? 'Done' : process}</Text>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <div className={styles.acordionContent}>
                          <div className={styles.artistList}>
                            <ul>
                              {currentContracts.map((contract) => {
                                return (
                                  <li key={contract._id}>
                                    {contract.artist.name} -{' '}
                                    {contract.artist.instrument}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className={styles.infoContainerAcor}>
                            <Text>
                              Total price: ${currentContracts[0].price}
                            </Text>
                            {!isPaid && process === 'ReadyToPay' ? (
                              <Button
                                onClick={() =>
                                  router.push({
                                    pathname: '/payment',
                                    query: { name: item },
                                  })
                                }
                              >
                                Go to pay
                              </Button>
                            ) : null}
                            <Button
                              mt={10}
                              color='red'
                              variant='outline'
                              onClick={() => openModal(currentContracts[0]._id)}
                            >
                              Delete
                            </Button>
                          </div>
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
        </div>
      </ClientLayout>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['sillusr'];
  let userData;
  try {
    const res = await fetch(
      `${process.env.HEROKU_BACKEND_URI}/api/users/datauser`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );
    userData = await res.json();
  } catch (e) {
    userData = { data: 'Token has expired' };
  }
  return {
    props: {
      user: userData.data,
    },
  };
};
