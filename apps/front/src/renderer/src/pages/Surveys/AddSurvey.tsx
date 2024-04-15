import { FormEvent } from 'react'
import { Button, Input } from 'ui'
import { Link } from 'react-router-dom'
import { useApi } from 'hooks'
import { config } from '../../../config'
import { toast } from 'react-toastify'

export function AddSurvey(): JSX.Element {
    const { Client, RequestState } = useApi<Survey>({
        baseUrl: config.baseUrl,
        url: '/surveys'
    })

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const response = await Client.post({
            phase: parseInt(formData.get('phase') as string),
            date: formData.get('date') as string
        })

        if (response.ok) {
            toast('Enregistré', {
                closeButton: true,
                type: 'success',
                position: 'bottom-right'
            })
            form.reset()
        } else {
            toast('Formulaire invalide', {
                closeButton: true,
                type: 'error',
                position: 'bottom-right'
            })
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1>Nouvelle enquête</h1>
                <Link to="/survey/list" className="btn btn-primary">
                    <i className="fa fa-list me-2"></i>Liste des enquêtes
                </Link>
            </div>

            <form action="" onSubmit={handleSubmit} method="post" className="mb-5">
                <div className="row mb-4">
                    <div className="col-xl-6">
                        <Input label="Phase" name="phase" />
                    </div>
                    <div className="col-xl-6">
                        <Input label="Date" type="date" name="date" />
                    </div>
                </div>

                <Button loading={RequestState.creating} icon="save" type="submit" mode="primary">
                    Enregistrer
                </Button>
            </form>
        </>
    )
}