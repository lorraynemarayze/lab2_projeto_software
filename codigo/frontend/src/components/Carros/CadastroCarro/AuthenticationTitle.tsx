import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    NumberInput,
} from '@mantine/core';
import classes from './AuthenticationTitle.module.css';
import '@mantine/dates/styles.css';
import { useState } from 'react';
import { DateInput } from '@mantine/dates';

export function AuthenticationTitle() {
    const [value, setValue] = useState<Date | null>(null);
    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Cadastre um novo veículo
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Marca" placeholder="Marca do seu carro" required />
                <TextInput label="Modelo" placeholder="Modelo do seu carro" required />
                <DateInput valueFormat="DD MMM YYYY"
                    value={value}
                    onChange={setValue}
                    label="Ano do Carro"
                    placeholder="Ano de fabricação do seu carro"
                />
                <NumberInput label="Preço Por dia" placeholder="Preço por dia do seu carro" required mt="md" />

                <Button fullWidth mt="xl">
                    Cadastrar
                </Button>
            </Paper>
        </Container>
    );
}
