import { Card, Image, Text, Group, Badge, Center, Button, GridCol } from '@mantine/core';
import { IconCalendarStats, IconNumber123 } from '@tabler/icons-react';
import classes from './FeaturesCard.module.css';
import { NavbarMinimal } from '../Navbar/NavbarMinimal';
import { Grid } from '@mantine/core';
import { ModalCarro } from './modal';
import { ModalReservaCarro } from './modal';

const mockdata = [
    { label: 'PLACA', icon: IconNumber123 },
    { label: 'ANO', icon: IconCalendarStats },
];

export function FeaturesCard() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch('http://localhost:3306/vehicle'); 
                if (response.ok) {
                    const data = await response.json();
                    setVehicles(data);
                } else {
                    console.error('Erro ao buscar veículos:', response.status);
                }
            } catch (error) {
                console.error('Erro ao buscar veículos:', error);
            }
        };

        fetchVehicles();
    }, []);
//https://www.youtube.com/watch?v=nGt_JGHYEO4&list=RDnGt_JGHYEO4&start_radio=1
    return (
        <Grid>
            <Grid.Col span="auto" className="col1">
                <NavbarMinimal />
            </Grid.Col>

            <Grid.Col span="auto" className="col2">
                {vehicles.map((vehicle) => (
                    <Card key={vehicle.licensePlate} id={classes.carros} withBorder radius="md" className={classes.card}>
                        <Group justify="space-between" mt="md">
                            <div>
                                <Text fw={500}>{vehicle.brand} {vehicle.model}</Text> 
                            </div>
                            <Badge variant="outline">
                                {/* Substitua por informações de desconto real */}
                                25% off 
                            </Badge>
                        </Group>

                        <Card.Section className={classes.section} mt="md">
                            <Text fz="sm" c="dimmed" className={classes.label}>
                                Descrição
                            </Text>

                            <Group gap={8} mb={-8}>
                                <Center key={vehicle.licensePlate}>
                                    <IconNumber123 size="1.05rem" className={classes.icon} stroke={1.5} />
                                    <Text size="xs">{vehicle.licensePlate}</Text> 
                                </Center>
                                <Center key={vehicle.year}>
                                    <IconCalendarStats size="1.05rem" className={classes.icon} stroke={1.5} />
                                    <Text size="xs">{vehicle.year}</Text> 
                                </Center>
                            </Group>
                        </Card.Section>

                        <Card.Section className={classes.section}>
                            <Group gap={30}>
                                <div>
                                    <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                                        R$   
 {vehicle.pricePerDay.toFixed(2)} 
                                    </Text>
                                    <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
                                        por dia
                                    </Text>
                                </div>

                                <ModalReservaCarro /> 
                            </Group>
                        </Card.Section>
                    </Card>
                ))}
                <ModalCarro /> 
            </Grid.Col>
        </Grid>
    );
}