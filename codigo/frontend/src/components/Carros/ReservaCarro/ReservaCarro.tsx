import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { Button, Grid } from '@mantine/core';

export function ReservaCarro({ vehicleId }) { // Passe o ID do veículo como prop
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    const [reservaError, setReservaError] = useState(false); 
    const [reservaSuccess, setReservaSuccess] = useState(false); 

    const handleSubmit = async () => {
        setReservaError(false); 
        setReservaSuccess(false); 

        if (value[0] == null || value[1] == null) {
            setReservaError(true);
            return;
        }

        const [startDate, endDate] = value;
        const formattedStartDate = startDate.toISOString().split('T')[0]; 
        const formattedEndDate = endDate.toISOString().split('T')[0];

        try {
            const response = await fetch('http://localhost:3306/order', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    renterId: 'user_id', // Substitua pelo ID do usuário logado
                    vehicleId: vehicleId,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                }),
            });

            if (response.ok) {
                // Reserva criada com sucesso
                setReservaSuccess(true); 
                setValue([null, null]); // Limpa os campos de data
            } else {
                // Erro ao criar a reserva
                setReservaError(true); 
            }
        } catch (error) {
            console.error('Erro ao criar reserva:', error);
            setReservaError(true); 
        }
    };

    return (
        <Grid>
            <DatePicker type="range" value={value} onChange={setValue} size='xl' />
            <Button fullWidth size='xl' onClick={handleSubmit}> 
                Reservar
            </Button>

            {reservaError && (
                <Notification color="red" title="Erro na reserva" mt="md">
                    Não foi possível criar a reserva. Tente novamente mais tarde.
                </Notification>
            )}

            {reservaSuccess && (
                <Notification color="green" title="Reserva criada" mt="md">
                    Sua reserva foi criada com sucesso!
                </Notification>
            )}
        </Grid>
    );
}