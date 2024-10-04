import { Table } from '@mantine/core';
import { NavbarMinimal } from '../Navbar/NavbarMinimal';
import { Grid } from '@mantine/core';
import './Table.css';


// const elements = [
//     { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
//     { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
//     { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
//     { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
//     { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
// ];

export function Tabela() {
    const [orders, setOrders] = useState([]);
    const [updateSuccess, setUpdateSuccess] = useState(false); 
    const [updateError, setUpdateError] = useState(false); 

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3306/order'); // Substitua '/order' pelo endpoint correto da sua API
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error('Erro ao buscar pedidos:', response.status);
                }
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleApprove = async (orderId) => {
        handleOrderUpdate(orderId, 'approve');
    };

    const handleReject = async (orderId) => {
        handleOrderUpdate(orderId, 'reject');
    };

    const handleOrderUpdate = async (orderId, action) => {
        setUpdateError(false);
        setUpdateSuccess(false);

        try {
            const response = await fetch(`http://localhost:3306/order/${orderId}/${action}`, { // Endpoint para aprovar/recusar pedido
                method: 'PUT', 
            });

            if (response.ok) {
                setUpdateSuccess(true);
                // Atualize a lista de pedidos após aprovar/recusar
                const updatedOrders = await response.json();
                setOrders(updatedOrders); 
            } else {
                setUpdateError(true);
            }
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            setUpdateError(true);
        }
    };

    const rows = orders.map((order) => (
        <Table.Tr key={order.id}>
            <Table.Td>{order.id}</Table.Td>
            <Table.Td>{order.renterId}</Table.Td>
            <Table.Td>{order.vehicleId}</Table.Td>
            <Table.Td>{order.startDate}</Table.Td>
            <Table.Td>{order.endDate}</Table.Td>
            <Table.Td>{order.total.toFixed(2)}</Table.Td> 
            <Table.Td>
                <Button color="green" onClick={() => handleApprove(order.id)}>Aprovar</Button>
                <Button color="red" onClick={() => handleReject(order.id)}>Recusar</Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Grid>
            {/* ... (código da NavbarMinimal) ... */}
            <Grid.Col span={11} className="col2">
                <Table>
                    {/* ... (código do cabeçalho da tabela) ... */}
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>

                {updateError && (
                    <Notification color="red" title="Erro ao atualizar" mt="md">
                        Não foi possível atualizar o pedido. Tente novamente mais tarde.
                    </Notification>
                )}

                {updateSuccess && (
                    <Notification color="green" title="Pedido atualizado" mt="md">
                        O pedido foi atualizado com sucesso!
                    </Notification>
                )}
            </Grid.Col>
        </Grid>
    );
}