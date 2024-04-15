import { useApi } from 'hooks'
import { Link } from 'react-router-dom'
import { config } from '../../config'
import { ApiErrorMessage, Button } from 'ui'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'

/**
 * Page d'accueil de gestion des étudiants
 * @returns JSX.Element
 */
export function School(): JSX.Element {
    const {
        Client,
        datas: schools,
        RequestState,
        error,
        resetError
    } = useApi<School>({
        baseUrl: config.baseUrl,
        url: '/schools',
        key: 'data'
    })

    const getSchools = async (): Promise<void> => {
        await Client.get()
    }

    const handleDelete = async (id: number): Promise<void> => {
        confirmAlert({
            title: 'Question',
            message: 'Voulez-vous supprimer ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: async (): Promise<void> => {
                        const response = await Client.destroy(id)
                        if (response.ok) {
                            toast('Enregistré', {
                                closeButton: true,
                                type: 'success',
                                position: 'bottom-right'
                            })
                            getSchools()
                        } else {
                            toast('Erreur de soumission', {
                                closeButton: true,
                                type: 'error',
                                position: 'bottom-right'
                            })
                        }
                    }
                },
                {
                    label: 'Non',
                    onClick: () =>
                        toast('Annulé', {
                            closeButton: true,
                            type: 'error',
                            position: 'bottom-right'
                        })
                }
            ]
        })
    }

    useEffect(() => {
        getSchools()
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1>Liste des établissement</h1>
                <div className="d-flex align-items-between">
                    <Button
                        onClick={getSchools}
                        className="me-2"
                        type="button"
                        mode="secondary"
                        icon="refresh"
                    >
                        Rechargher
                    </Button>
                    <Link to="/school/add" className="btn btn-primary me-2">
                        <i className="fa fa-plus me-2"></i>Nouveau
                    </Link>
                </div>
            </div>

            {error && (
                <ApiErrorMessage
                    className="mb-3"
                    message={error.message}
                    onClose={(): void => {
                        resetError()
                    }}
                />
            )}

            <table className="table table-striped mb-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Commune</th>
                        <th>District</th>
                        <th>Adresse</th>
                        <th>Responsable</th>
                        <th style={{ width: '15%' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {RequestState.loading && (
                        <tr>
                            <td colSpan={7} className="text-center">
                                Chargement...
                            </td>
                        </tr>
                    )}
                    {schools.length > 0 &&
                        schools.map((school) => (
                            <tr key={school.id}>
                                <td>{school.id}</td>
                                <td>{school.name}</td>
                                <td>{school?.commune?.name}</td>
                                <td>{school?.commune?.district.name}</td>
                                <td>{school.localisation}</td>
                                <td>{school.responsable}</td>
                                <td>
                                    <Link
                                        className="btn-sm me-2 btn btn-info text-white"
                                        to={`/school/details/${school.id}`}
                                    >
                                        <i className="fa fa-folder"></i>
                                    </Link>
                                    <Link
                                        className="btn-sm me-2 btn btn-primary"
                                        to={`/school/edit/${school.id}`}
                                    >
                                        <i className="fa fa-edit"></i>
                                    </Link>
                                    <Button
                                        type="button"
                                        mode="danger"
                                        icon="trash"
                                        size="sm"
                                        onClick={(): void => {
                                            handleDelete(school.id)
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    {!RequestState.loading && schools.length <= 0 && (
                        <tr>
                            <td colSpan={8} className="text-center">
                                Aucune données
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}