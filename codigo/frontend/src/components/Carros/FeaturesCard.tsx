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


// private String licensePlate ;
// private String brand;
// private String model;
// private int year;
// private BigDecimal pricePerDay;
// private boolean isAvaliable;
// }


export function FeaturesCard() {
    const features = mockdata.map((feature) => (
        <Center key={feature.label}>
            <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
            <Text size="xs">{feature.label}</Text>
        </Center>
    ));

    return (
        <Grid>
            <Grid.Col span="auto" className="col1">
                <NavbarMinimal />
            </Grid.Col>
            
            <Grid.Col span="auto" className="col2">
        <Card id={classes.carros} withBorder radius="md" className={classes.card}>

            <Group justify="space-between" mt="md">
                <div>
                    <Text fw={500}>Tesla Model S</Text>
                </div>
                <Badge variant="outline">25% off</Badge>
            </Group>

            <Card.Section className={classes.section} mt="md">
                <Text fz="sm" c="dimmed" className={classes.label}>
                    Descrição
                </Text>

                <Group gap={8} mb={-8}>
                    {features}
                </Group>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Group gap={30}>
                    <div>
                        <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                            R$168.00
                        </Text>
                        <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
                            por dia
                        </Text>
                    </div>

                    <ModalReservaCarro />
                </Group>
            </Card.Section>
        </Card>
        <ModalCarro />
        </Grid.Col>
        </Grid>
    );
}