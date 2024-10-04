import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { Button, Grid } from '@mantine/core';

export function ReservaCarro() {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    return(
        <Grid>
        <DatePicker type="range" value={value} onChange={setValue} size='xl' />
        <Button fullWidth size='xl'> Reservar</Button>
        </Grid>
    );
}