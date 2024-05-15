import { RepositoriesList } from "../RepositoriesList/RepositoriesList"
import { useEffect, useState } from "react"
import {getRepositories} from "../../services/github-services"
import './SearchRepositories.css'
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
        

export const SearchRepositories = () => {

  const [searchText, setSearchText] = useState("")
  const [repositories, setRepositories] = useState(null)
  const [totalRepositories, setTotalRepositories] = useState(0)
  const [loading, setLoading] = useState(false)
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const searchTextls = localStorage.getItem('searchText')
    if(searchTextls){
      console.log(searchTextls);
      setSearchText(searchTextls)
      getRepositories(searchTextls).then((response) => {
        console.log(response);
        setTotalRepositories(response.totalCount)
        setRepositories(response.data);
      })
    }
  },[])

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
  }

  const handleSearch = () => {
    setLoading(true)
    getRepositories(searchText).then((response) => {
      console.log(response, 'response2');
      setRepositories(response.data)
      setLoading(false)
    })
    // guardar en el local storage
    localStorage.setItem('searchText', searchText)
  }

  const handlePageChange = (page, rows, first) => {
    setLoading(true)
    console.log(page, 'page');
    getRepositories(searchText, page).then((response) => {
      setRepositories(response.data)
      setLoading(false)
      setPage(page)
      setFirst(first)
      setRows(rows)
    })
  }

  return (
    <>
      <section className="repofinder__container">
          <h1>Repofinder</h1>
          <div className="repofinder__search_options">
            <div className="repofinder__search_container">
              <input value={searchText} onChange={(e)=>handleSearchText(e)} type="text" placeholder="Buscar Repositorio"/>
              <button onClick={handleSearch}><span className="pi pi-search"></span></button>
            </div>
            <button onClick={()=>setVisible(!visible)} className="repofinder__search_help"><span className="pi pi-question"></span></button>
          </div>
          {loading ? 
          <div className="spinner">
            <ProgressSpinner />
          </div>
          : (repositories !=null ? <RepositoriesList repositories={repositories} totalRepositories={totalRepositories} handlePageChange={handlePageChange} rows={rows} first={first} page={page}/>  : <p>Aqui apareceran los repositorios!</p>)}
      </section>
      <Dialog header="Buscador de GitHub" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        <div>
          <h2>Buscador de Repositorios</h2>
          <p>
            El buscador de GitHub te permite buscar repositorios públicos utilizando diferentes criterios de búsqueda.
          </p>
          <h3>Uso:</h3>
          <p>
            Para utilizar el buscador, ingresa tu consulta en el campo de búsqueda y presiona el botón &quot;Buscar Repositorio&quot;. 
            Se mostrará una lista de repositorios que coinciden con tu búsqueda.
          </p>
          <h3>Funcionalidades:</h3>
          <p>Buscar repositorios por nombre, descripción o nombre de usuario del propietario.</p>
          <ul>
            <li>Utilizar atajos como <strong>user:nombre_de_usuario</strong> para buscar repositorios de un usuario específico.</li>
            <li>Utilizar atajos como <strong>repo:nombre_del_repositorio</strong> para buscar un repositorio específico.</li>
            <li>Utilizar atajos como <strong>language:nombre_del_lenguaje</strong> para buscar repositorios en un lenguaje específico.</li>
            <li>Utilizar atajos como <strong>stars:1000</strong> para buscar repositorios con más de 1000 estrellas.</li>
            <li>Utilizar atajos como <strong>forks:500</strong> para buscar repositorios con más de 500 bifurcaciones.</li>
          </ul>
          <h3>Nota:</h3>
          <p>
            Ten en cuenta que la API de GitHub tiene límites de tasa, por lo que es posible que encuentres restricciones en el uso intensivo del buscador.
          </p>
        </div>
      </Dialog>
    </>
  )
}
