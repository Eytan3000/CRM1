import { Typography } from '@material-ui/core';

export default function TitleLabel({ variant, className, label }) {
  return (
    <Typography variant={variant} className={className}>
      {label}
    </Typography>
  );
}
