import Box from '@mui/material/Box';
import { FormProvider, FSelect, FTextField } from './form';
import Modal from '@mui/material/Modal';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { alpha, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { addPokemon } from '../features/pokemons/pokemonSlice';
import { useNavigate } from 'react-router-dom';


const pokemonTypes = [
    { id: 0, },
    { id: 1, label: "bug" }, { id: 2, label: "dragon" }, { id: 3, label: "fairy" },
    { id: 4, label: "fire" }, { id: 5, label: "ghost" }, { id: 6, label: "ground" },
    { id: 5, label: "normal" }, { id: 6, label: "psychic" }, { id: 7, label: "steel" },
    { id: 8, label: "dark" }, { id: 9, label: "electric" }, { id: 10, label: "fighting" },
    { id: 11, label: "flying" }, { id: 12, label: "grass" }, { id: 13, label: "ice" },
    { id: 14, label: "poison" }, { id: 15, label: "rock" }, { id: 16, label: "water" },
]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const defaultValues = {
    name: '',
    id: '',
    url: '',
    type1: '',
    type2: '',
};

export default function PokemonModal({ open, setOpen }) {

    const navigate = useNavigate()
    const methods = useForm(defaultValues);
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const { name, id, url, type1, type2 } = data
        if (name && id && url && type1) {
            dispatch(addPokemon({ name, id, imgUrl: url, types: [type1, type2] }))

            navigate(`/pokemons/${id}`)
        }
        else (alert(`Please input fields : Name, Id, Image URL, Type1`))


    };

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <FTextField
                                name="name"
                                fullWidth
                                rows={4}
                                placeholder="Name"
                                sx={{
                                    '& fieldset': {
                                        borderWidth: `1px !important`,
                                        borderColor: alpha('#919EAB', 0.32),
                                    },
                                }}
                            />

                            <FTextField
                                name="id"
                                fullWidth
                                rows={4}
                                placeholder="Id"
                                sx={{
                                    '& fieldset': {
                                        borderWidth: `1px !important`,
                                        borderColor: alpha('#919EAB', 0.32),
                                    },
                                }}
                            />
                            <FTextField
                                name="url"
                                fullWidth
                                // rows={4}
                                placeholder="Image Url"
                                sx={{
                                    '& fieldset': {
                                        borderWidth: `1px !important`,
                                        borderColor: alpha('#919EAB', 0.32),
                                    },
                                }}
                            />
                            <FSelect name="type1" label="type1">
                                {
                                    pokemonTypes.map((option) => (
                                        <option key={option.id}
                                            value={option.label}>
                                            {option.label}
                                        </option>
                                    ))
                                }
                            </FSelect>
                            <FSelect name="type2" label="type2">
                                {
                                    (pokemonTypes.map((option) => (
                                        <option key={option.id}
                                            value={option.label}>
                                            {option.label}
                                        </option>
                                    )))
                                }
                            </FSelect>


                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="small"
                                    loading={
                                        isSubmitting
                                        // || isLoading
                                    }
                                >
                                    Create Pokemon
                                </LoadingButton>
                            </Box>
                        </Stack>
                    </FormProvider>
                </Box>
            </Modal>
        </div >
    );
}
