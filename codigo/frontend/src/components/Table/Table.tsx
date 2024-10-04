import { Table } from '@mantine/core';
import { NavbarMinimal } from '../Navbar/NavbarMinimal';
import { Grid } from '@mantine/core';
import './Table.css';


const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export function Tabela() {
    const rows = elements.map((element) => (
        <Table.Tr key={element.name}>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
        </Table.Tr>
    ));

    return (

        <Grid>
            <Grid.Col span={1} className="col1">
                <NavbarMinimal />
            </Grid.Col>
            <Grid.Col span={11} className="col2">
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Pedido</Table.Th>
                    <Table.Th>ID Solicitante</Table.Th>
                    <Table.Th>ID Veículo</Table.Th>
                    <Table.Th>Data de Início</Table.Th>
                    <Table.Th>Data de Término</Table.Th>
                    <Table.Th>Valor total</Table.Th>
                    <Table.Th>Ações ***Aki precisa ter os botoes de aceitar ou recusar um contrato, na visao do agente***</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        </Grid.Col>
        </Grid>
    );
}