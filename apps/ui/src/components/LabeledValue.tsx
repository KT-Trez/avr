import { Typography, type TypographyProps } from '@mui/material';

type LabeledValueProps = {
  ValueComponent?: TypographyProps['component'];
  label: string;
  value: number | string | undefined;
};

export const LabeledValue = ({ label, value, ValueComponent = 'span' }: LabeledValueProps) => (
    <Typography>
      <Typography color='textSecondary' component='span' variant='body2'>
        {label}:
      </Typography>{' '}
      <Typography color={!value ? 'textDisabled' : undefined} component={ValueComponent}>
        {value ?? 'N / A'}
      </Typography>
    </Typography>
);
