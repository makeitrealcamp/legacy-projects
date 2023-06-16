import { useEffect, useState, useRef } from 'react';
import {
  Stepper,
  Button,
  Group,
  TransferList,
  Text,
  TransferListData,
  Center,
  TextInput,
  ActionIcon,
  Tooltip,
  Textarea,
  Divider,
  NumberInput,
  NumberInputHandlers,
  Card,
  Accordion,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  IconCheck,
  IconBug,
  IconFilePlus,
  IconClock,
  IconPlus,
  IconMinus,
} from '@tabler/icons';
import Layout from '../components/Layout';
import styles from '../styles/StepperContract.module.scss';
import { GetServerSideProps } from 'next';
import { setSlicePrice } from '../slices/contractSlice';
import { ConnectionsProps } from './profile/client/connections';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  makeContracts,
  updateContract,
  lastUpdateContract,
} from '../lib/contracts';
import Cookies from 'js-cookie';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useCounterInputStyles } from '../components/ui/useCounterInput';
import { useRouter } from 'next/router';

interface StepperContractProps extends ConnectionsProps {}

export type AllSongs = { song: string; author: string }[];
export type RehearsalDate = { schedule: Date; time: Date }[];

export default function StepperContract({ user }: StepperContractProps) {
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector((state) => state.contract.price);
  const [active, setActive] = useState(0);
  const [loadingStepper, setLoadingStepper] = useState({
    stepOne: false,
    stepTwo: false,
    stepThree: false,
  });
  const router = useRouter();
  const [contractName, setContractName] = useState<string>('');
  const [schedule, setSchedule] = useState<Date | null>(null);
  const [exactTime, setExactTime] = useState<Date | null>(null);
  const [recommendations, setRecommendations] = useState<string>('');
  const [addressInfo, setAddressInfo] = useState<string>('');
  const handlers = useRef<NumberInputHandlers>(null);
  const min = 0;
  const max = 5;
  const listData = user.connections.map((user) => {
    return {
      label: user.userB.name,
      value: user.userB.email,
      price: user.userB.price,
    };
  });
  const [numOfRehearsal, setNumOfRehearsal] = useState<number | undefined>(1);
  const [address, setAddress] = useState<string>('');

  const initialValues: TransferListData = [listData, []];
  const [data, setData] = useState<TransferListData>(initialValues);
  const [contracts, setContracts] = useState<any[]>([]);
  const [repertoire, setRepertoire] = useState({
    song: '',
    author: '',
  });
  const [allSongs, setAllSongs] = useState<AllSongs>([]);
  const [rehearsalInputsToRender, setRehearsalInputsToRender] =
    useState<RehearsalDate>([]);
  const { classes } = useCounterInputStyles();

  useEffect(() => {
    const total = data[1].reduce((a, b) => a + b.price, 0);
    dispatch(setSlicePrice({ price: total }));
  }, [data, dispatch]);

  function arrayGenerator(length: number) {
    return Array.from({ length }, (_, i) => ({
      schedule: new Date(),
      time: new Date(),
    }));
  }

  useEffect(() => {
    if (typeof numOfRehearsal === 'number') {
      const newArray = arrayGenerator(numOfRehearsal);
      setRehearsalInputsToRender(newArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfRehearsal, dispatch, contracts.length]);

  const token = Cookies.get('sillusr');

  const nextStep = async () => {
    if (active === 0 && contractName !== '') {
      try {
        setLoadingStepper((prev) => ({
          ...prev,
          stepOne: true,
        }));
        const artists = data[1];
        const res = await makeContracts(artists, contractName, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showNotification({
          id: 'load-data-contract',
          color: 'teal',
          title: 'Contract was created successfully',
          message:
            'Notification will close in 4 seconds, you can close this notification now.',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
        setContracts(res.data);
        setActive((current) => (current < 3 ? current + 1 : current));
      } catch {
        showNotification({
          id: 'load-data-contract',
          color: 'red',
          title: 'Contract could not been created, try again',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconBug size={16} />,
          autoClose: 4000,
        });
      } finally {
        setLoadingStepper((prev) => ({
          ...prev,
          stepOne: false,
        }));
      }
    } else if (active === 1 && schedule) {
      try {
        setLoadingStepper((prev) => ({
          ...prev,
          stepTwo: true,
        }));
        const res = await updateContract(
          exactTime,
          schedule,
          contracts,
          recommendations,
          allSongs,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        showNotification({
          id: 'load-data-contract',
          color: 'teal',
          title: 'Contract was updated successfully',
          message:
            'Notification will close in 4 seconds, you can close this notification now.',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
        setContracts(res.data);
        setActive((current) => (current < 3 ? current + 1 : current));
      } catch {
        showNotification({
          id: 'load-data-contract',
          color: 'red',
          title: 'Contract could not been updated, try again',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconBug size={16} />,
          autoClose: 4000,
        });
      } finally {
        setLoadingStepper((prev) => ({
          ...prev,
          stepTwo: false,
        }));
      }
    } else if (active === 2 && address !== '') {
      try {
        setLoadingStepper((prev) => ({
          ...prev,
          stepThree: true,
        }));
        const res = await lastUpdateContract(
          totalPrice,
          rehearsalInputsToRender,
          address,
          addressInfo,
          contracts,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        showNotification({
          id: 'load-data-contract',
          color: 'teal',
          title: 'Contract was updated successfully',
          message:
            'Notification will close in 4 seconds, you can close this notification now.',
          icon: <IconCheck size={16} />,
          autoClose: 4000,
        });
        setContracts(res.data);
        setActive((current) => (current < 3 ? current + 1 : current));
      } catch {
        showNotification({
          id: 'load-data-contract',
          color: 'red',
          title: 'Contract could not been updated, try again',
          message:
            'Notification will close in 4 seconds, you can close this notification now',
          icon: <IconBug size={16} />,
          autoClose: 4000,
        });
      } finally {
        setLoadingStepper((prev) => ({
          ...prev,
          stepThree: false,
        }));
      }
    }
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Layout title='Sillevon | Contract'>
      <div className={styles.stepperContract}>
        <Stepper active={active} onStepClick={setActive} breakpoint='sm'>
          <Stepper.Step
            loading={loadingStepper.stepOne}
            label='Selection step'
            description='Select your Artists/Band'
            allowStepSelect={active > 0}
          >
            <Center>
              <TextInput
                className={styles.inputContractName}
                value={contractName}
                onChange={(e) => setContractName(e.target.value)}
                placeholder='Type your unique name for the contract'
                label='Name of Contract'
                withAsterisk
                radius='xl'
              />
            </Center>
            <TransferList
              value={data}
              onChange={setData}
              searchPlaceholder='Search...'
              nothingFound='Nothing here'
              titles={['List of Artists/Band', 'To make a contract']}
              breakpoint='sm'
            />
          </Stepper.Step>
          <Stepper.Step
            loading={loadingStepper.stepTwo}
            label='Songs and schedule step'
            description='Set your repetorie and date'
            allowStepSelect={active > 1}
          >
            <div className={styles.stepTwoContainer}>
              <div className={styles.repertoireContainer}>
                <div className={styles.inputsSongs}>
                  <TextInput
                    value={repertoire.song}
                    onChange={(e) =>
                      setRepertoire((prev) => ({
                        ...prev,
                        song: e.target.value,
                      }))
                    }
                    placeholder='Type the name of your song'
                    className={styles.inputs}
                    radius='xl'
                  />
                  <TextInput
                    className={styles.inputs}
                    value={repertoire.author}
                    onChange={(e) =>
                      setRepertoire((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
                    }
                    placeholder='Type the author of the song'
                    radius='xl'
                  />
                  <Tooltip label='Add song to the list'>
                    <ActionIcon
                      onClick={() => {
                        setAllSongs((prev) => [...prev, repertoire]);
                        setRepertoire({ song: '', author: '' });
                      }}
                    >
                      <IconFilePlus size={35} />
                    </ActionIcon>
                  </Tooltip>
                </div>
                <div className={styles.listOfSongs}>
                  <thead className={styles.thead}>
                    <th>Song</th>
                    <th>Author</th>
                  </thead>
                  <tbody>
                    {allSongs.length > 0 ? (
                      allSongs.map((song) => {
                        return (
                          <tr
                            key={`${song.song} - ${song.author}`}
                            className={styles.trow}
                          >
                            <td>{song.song}</td>
                            <td>{song.author}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <div className={styles.noSongsMessage}>
                        <Text>There are not songs added</Text>
                      </div>
                    )}
                  </tbody>
                </div>
              </div>
              <Divider my='sm' orientation='vertical' />
              <div className={styles.datePickersContainer}>
                <div className={styles.dateInputs}>
                  <DatePicker
                    placeholder='Pick date'
                    label='Event date'
                    withAsterisk
                    dropdownType='modal'
                    value={schedule}
                    onChange={setSchedule}
                  />
                  <TimeInput
                    label='Pick time'
                    placeholder='Pick time'
                    icon={<IconClock size={16} />}
                    value={exactTime}
                    onChange={setExactTime}
                  />
                </div>
                <Divider my='sm' />
                <div>
                  <Textarea
                    label='Your recommendations'
                    placeholder='If you want to make some recommendations'
                    minRows={4}
                    mt='md'
                    value={recommendations}
                    onChange={(e) => setRecommendations(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Stepper.Step>
          <Stepper.Step
            loading={loadingStepper.stepThree}
            label='Set lasts details'
            description='Provide the last data'
            allowStepSelect={active > 2}
          >
            <div className={styles.rehearalContainer}>
              <div className={styles.leftSideContainer}>
                <div className={styles.inputCounterRehearsal}>
                  <Text>Set the rehearsals number</Text>
                  <div className={classes.wrapper}>
                    <ActionIcon<'button'>
                      size={28}
                      variant='transparent'
                      onClick={() => {
                        handlers.current?.decrement();
                        if (
                          typeof numOfRehearsal === 'number' &&
                          typeof totalPrice === 'number'
                        ) {
                          const currentRehearsalPrice = 8;
                          const newPrice = totalPrice - currentRehearsalPrice;
                          dispatch(setSlicePrice({ price: newPrice }));
                        }
                      }}
                      disabled={numOfRehearsal === min}
                      className={classes.control}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      <IconMinus size={16} stroke={1.5} />
                    </ActionIcon>
                    <NumberInput
                      variant='unstyled'
                      min={min}
                      max={max}
                      handlersRef={handlers}
                      value={numOfRehearsal}
                      onChange={setNumOfRehearsal}
                      classNames={{ input: classes.input }}
                    />
                    <ActionIcon<'button'>
                      size={28}
                      variant='transparent'
                      onClick={() => {
                        handlers.current?.increment();
                        if (
                          typeof numOfRehearsal === 'number' &&
                          typeof totalPrice === 'number'
                        ) {
                          const currentRehearsalPrice =
                            contracts.length * 8 * numOfRehearsal;
                          const newPrice = totalPrice + currentRehearsalPrice;
                          dispatch(setSlicePrice({ price: newPrice }));
                        }
                      }}
                      disabled={numOfRehearsal === max}
                      className={classes.control}
                      onMouseDown={(event) => event.preventDefault()}
                    >
                      <IconPlus size={16} stroke={1.5} />
                    </ActionIcon>
                  </div>
                </div>
                <div className={styles.listOfRehearsals}>
                  {rehearsalInputsToRender.length > 0 ? (
                    rehearsalInputsToRender.map((item, i) => {
                      return (
                        <div className={styles.dateInputs} key={`${i}inputs`}>
                          <DatePicker
                            placeholder='Pick date'
                            label='Rehearsal date'
                            withAsterisk
                            dropdownType='modal'
                            value={item.schedule}
                            onChange={(date) =>
                              setRehearsalInputsToRender((prev) => {
                                if (date !== null) {
                                  prev[i].schedule = date;
                                }
                                return prev;
                              })
                            }
                          />
                          <TimeInput
                            label='Pick time'
                            placeholder='Rehearsal date'
                            icon={<IconClock size={16} />}
                            value={item.time}
                            onChange={(time) =>
                              setRehearsalInputsToRender((prev) => {
                                if (time !== null) {
                                  prev[i].time = time;
                                }
                                return prev;
                              })
                            }
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className={styles.noSongsMessage}>
                      <Text>There are not rehearsals added</Text>
                    </div>
                  )}
                </div>
              </div>
              <Divider my='sm' orientation='vertical' />
              <div className={styles.rightSideContainer}>
                <TextInput
                  label='Event address'
                  placeholder='15329 Huston 21st'
                  value={address}
                  withAsterisk
                  className={styles.addressInput}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Textarea
                  label='Address aditional info'
                  placeholder='Provide more details directions about the event address'
                  minRows={4}
                  className={styles.addressInfo}
                  mt='md'
                  value={addressInfo}
                  onChange={(e) => setAddressInfo(e.target.value)}
                />
              </div>
            </div>
          </Stepper.Step>
          <Stepper.Completed>
            <Card
              withBorder
              radius='md'
              p='xl'
              className={styles.cardContainer}
            >
              <Group className={styles.acordionContainer}>
                <Accordion
                  className={styles.acordion}
                  variant='contained'
                  radius='lg'
                  defaultValue='customization'
                >
                  {contracts.length > 0 &&
                    contracts.map((contract) => {
                      return (
                        <Accordion.Item
                          value={contract.artist.name}
                          key={contract._id}
                        >
                          <Accordion.Control>
                            {contract.artist.name}
                          </Accordion.Control>
                          <Accordion.Panel>
                            <Text>
                              Instrument: {contract.artist.instrument}
                            </Text>
                            <Text>Style: {contract.artist.genre}</Text>
                            <Text>City: {contract.artist.city}</Text>
                            <Text>Price: ${contract.artist.price} /hr</Text>
                          </Accordion.Panel>
                        </Accordion.Item>
                      );
                    })}
                </Accordion>
              </Group>
              <Divider my='sm' orientation='vertical' />
              <div className={styles.contractDataContainer}>
                <Text>
                  Total price: ${contracts.reduce((a, b) => a + b.price, 0)}
                </Text>
                <Button onClick={() => router.push('/profile/client')}>
                  Go to profile
                </Button>
              </div>
            </Card>
          </Stepper.Completed>
        </Stepper>
        {active === 3 ? null : (
          <Center>
            <Text>Total price: ${totalPrice} /hr</Text>
          </Center>
        )}
        {active === 3 ? null : (
          <Group position='center' mt='xl'>
            <Button variant='default' onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>Next step</Button>
          </Group>
        )}
      </div>
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
