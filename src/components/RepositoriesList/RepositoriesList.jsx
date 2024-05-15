
import { Card } from 'primereact/card';
import { Paginator } from 'primereact/paginator';
import './RepositoriesList.css';
import { useLocation } from 'wouter';

export const RepositoriesList = ({ repositories, totalRepositories, handlePageChange, rows, first, page }) => {
  
  const [, setLocation] = useLocation();
  

  const onPageChange = event => {
    if (event.page+1 === page) return;
    handlePageChange(event.page+1, event.rows, event.first);
    scrollToTop();
  };

  const scrollToTop = ()=> {
    const scrollStep = -window.scrollY / (500 / 15); // 500 es la duración de la animación en milisegundos
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  }

  const handleViewDetails = (repository) => {
    setLocation(`/repo/${repository.owner.login}/${repository.name}`, { replace: false })
  } 


  return (
      <section className="repositoriesList_container">
        <div className="repositories__container">
          {repositories.length > 0 ? (
            repositories.map(repository => (
              <div key={repository.id} className="repostorie__card_container" onClick={()=>handleViewDetails(repository)} >
                <Card title={repository.name} subTitle={repository.full_name} style={{height:"270px"}}>
                  <p>{repository.description}</p>
                  <p className="pi pi-star-fill">{repository.stargazers_count}</p>
                  <img className="repositorie__avatar_img" src={repository.owner.avatar_url} alt="" />
                </Card>
              </div>
            ))
          ) : (
            <p>No hay repositorios</p>
          )}
        </div>
        {repositories ? 
          <Paginator
            first={first}
            rows={10}
            totalRecords={totalRepositories}
            onPageChange={(e)=>onPageChange(e)}
          />
        : null}
      </section>
  );
};
