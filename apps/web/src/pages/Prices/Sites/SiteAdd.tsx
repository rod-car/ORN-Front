import { NavLink } from 'react-router-dom'
import { Block } from 'ui'
import { SiteForm } from '@renderer/pages/Prices'

export function SiteAdd(): JSX.Element {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h2>Ajouter un site</h2>
                <NavLink to="/prices/sites/list" className="btn btn-primary">
                    <i className="fa fa-list me-2"></i>Liste des sites
                </NavLink>
            </div>

            <Block className="mb-5">
                <SiteForm />
            </Block>
        </>
    )
}
