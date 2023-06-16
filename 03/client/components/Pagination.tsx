import { Dispatch, SetStateAction, useRef } from 'react';
import { NumberInput, NumberInputHandlers, ActionIcon } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons';
import { usePaginationStyles } from './ui/usePaginationStyles';

interface PaginationProps {
  min?: number;
  max?: number;
  pagination: number | undefined;
  setPagination: Dispatch<SetStateAction<number | undefined>>;
}

export function Pagination({
  min = 1,
  max = 10,
  pagination,
  setPagination,
}: PaginationProps) {
  const { classes } = usePaginationStyles();
  const handlers = useRef<NumberInputHandlers>(null);

  return (
    <div className={classes.wrapper}>
      <ActionIcon<'button'>
        size={28}
        variant='transparent'
        onClick={() => handlers.current?.decrement()}
        disabled={pagination === min}
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
        value={pagination}
        onChange={(value) => {
          if (value) setPagination(value);
        }}
        classNames={{ input: classes.input }}
      />

      <ActionIcon<'button'>
        size={28}
        variant='transparent'
        onClick={() => handlers.current?.increment()}
        disabled={pagination === max}
        className={classes.control}
        onMouseDown={(event) => event.preventDefault()}
      >
        <IconPlus size={16} stroke={1.5} />
      </ActionIcon>
    </div>
  );
}
