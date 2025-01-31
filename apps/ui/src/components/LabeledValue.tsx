import { Typography, type TypographyProps } from '@mui/material';

type LabeledValueProps = {
  ValueComponent?: TypographyProps['component'];
  label: string;
  value: number | string;
};

export const LabeledValue = ({ label, value, ValueComponent = 'span' }: LabeledValueProps) => (
    <Typography>
      <Typography color='text.secondary' component='span' variant='body2'>
        {label}:
      </Typography>{' '}
      <Typography component={ValueComponent}>{value}</Typography>
    </Typography>
);
