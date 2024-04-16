import { useApi } from 'hooks'
import { NavLink, useParams } from 'react-router-dom'
import { ApiErrorMessage, Block } from 'ui'
import { config, token } from '../../../config'
import { useEffect, useState } from 'react'
import { StudentEvolution, StudentStatus } from '@renderer/charts'

export function DetailsStudent(): JSX.Element {
    const { Client, error, resetError } = useApi<Student>({
        baseUrl: config.baseUrl,
        token: token,
        url: 'students'
    })

    const [student, setStudent] = useState<Student | null>(null)

    const { id } = useParams()

    const getStudent = async (id: number): Promise<void> => {
        const student = await Client.find(id, { student_only: 1 })
        if (student) setStudent(student)
    }

    useEffect(() => {
        getStudent(id as unknown as number)
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h2>{student && student.fullname}</h2>
                <NavLink to="/student/list" className="btn btn-primary">
                    <i className="fa fa-list me-2"></i>Liste des étudiants
                </NavLink>
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

            <Block className="mb-5">
                <h3 className="mb-3">Classes</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Classe</th>
                            <th>Annee scolaire</th>
                            <th>Etablissement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {student &&
                            student.classes?.map((classe) => {
                                const school = student.schools?.find((school) => {
                                    return school.pivot.scholar_year === classe.pivot.scholar_year
                                })

                                return (
                                    <tr key={classe.name}>
                                        <td>{classe.name}</td>
                                        <td>{classe.pivot.scholar_year}</td>
                                        <td>{school.name}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </Block>

            {student && (
                <>
                    <div className="mb-5">
                        <StudentEvolution student_id={student.id} />
                    </div>
                    <StudentStatus student_id={student.id} />
                </>
            )}
        </>
    )
}
