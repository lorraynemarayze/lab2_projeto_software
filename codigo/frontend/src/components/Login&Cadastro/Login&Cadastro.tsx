import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
} from '@mantine/core';
import "./LoginCadastro.css"

//https://www.youtube.com/watch?v=HqiZRQHhqQs

export function AuthenticationForm(props: PaperProps) {
    const [type, toggle] = useToggle(['faça login', 'registre-se']);
    const [loginError, setLoginError] = useState(false); 
    const form = useForm({
        initialValues: {
            email: '',
            nome: '',
            senha: '',
            rg: '',
            endereco: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Email invalido'),
            senha: (val) => (val.length <= 6 ? 'Sua senha deve conter no minimo 6 caracteres' : null),
        },
    });

    const handleSubmit = async (values) => {
        setLoginError(false); // Reset error state

        try {
            const response = await fetch('http://localhost:3306/login', { // Substitua '/login' pelo endpoint correto da sua API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: values.email, password: values.senha }),
            });

            if (response.ok) {
                const user = await response.json();
                // Armazene as informações do usuário (tipo, token, etc.) no localStorage ou em um contexto
                // Redirecione o usuário para a página correta, de acordo com o tipo (cliente ou agente)
                console.log('Usuário logado com sucesso:', user); 
            } else {
                setLoginError(true); 
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setLoginError(true); 
        }
    };

    return (
        <Paper id='Login' radius="md" p="xl" withBorder {...props}>
            <Text size="lg" fw={500}>
                Bem vindo ao Localize, {type} com
            </Text>

            <Divider my="lg" />

            <form onSubmit={form.onSubmit(() => { })}>
                <Stack>
                    {type === 'registre-se' && (
                        <TextInput
                            required
                            label="Nome"
                            placeholder="Seu nome"
                            value={form.values.nome}
                            onChange={(event) => form.setFieldValue('nome', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="exemplo@gmail.com"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Email invalido'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Senha"
                        placeholder="Sua senha"
                        value={form.values.senha}
                        onChange={(event) => form.setFieldValue('senha', event.currentTarget.value)}
                        error={form.errors.password && 'Sua senha deve conter no minimo 6 caracteres'}
                        radius="md"
                    />

                    {type === 'registre-se' && (
                        <TextInput
                            required
                            label="RG"
                            placeholder="Numero do seu RG"
                            value={form.values.rg}
                            onChange={(event) => form.setFieldValue('rg', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    {type === 'registre-se' && (
                        <TextInput
                            required
                            label="Endereço"
                            placeholder="Rua, numero, bairro"
                            value={form.values.endereco}
                            onChange={(event) => form.setFieldValue('endereco', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    {type === 'registre-se' && (
                        <Checkbox
                            label="Sou agente"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                        />
                    )}
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                        {type === 'registre-se'
                            ? 'Já possui uma conta? Faça Login'
                            : "Não possui uma conta? Registre-se"}
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>

            {loginError && ( 
                <Notification color="red" title="Erro no login" mt="md">
                    Credenciais inválidas. Verifique seu email e senha.
                </Notification>
            )}

        </Paper>
    );
}