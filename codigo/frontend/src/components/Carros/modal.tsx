import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { AuthenticationTitle } from './CadastroCarro/AuthenticationTitle'
import { ReservaCarro } from './ReservaCarro/ReservaCarro'	

export function ModalCarro() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} withCloseButton={false} centered>
                {<AuthenticationTitle />}
            </Modal>

            <Button radius="xl" style={{ marginTop: 20 }} onClick={open}>Cadastrar novo veículo</Button>
        </>
    );
}

export function ModalReservaCarro(){
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} withCloseButton={false} centered>
                {<ReservaCarro />}
            </Modal>

            <Button radius="xl" style={{ marginTop: 15 }} onClick={open}>Reservar veículo</Button>
        </>
    );
}