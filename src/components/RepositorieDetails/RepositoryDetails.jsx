import React, { useState, useEffect, useRef } from 'react';
import { Panel } from 'primereact/panel';
import { Avatar } from 'primereact/Avatar';
import { Toast } from 'primereact/toast';
import { useParams } from 'wouter';
import { getRepositoryByOwnerAndRepo } from '../../services/github-services';
import './RepositoryDetails.css';

export const RepositoryDetails = () => {
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  const params = useParams();

  useEffect(() => {
    if (params.owner && params.repository) {
      const owner = params.owner;
      const repoName = params.repository;
      setLoading(true);
      getRepositoryByOwnerAndRepo(owner, repoName).then((response) => {
        console.log(response);
        setLoading(false);
        setRepository(response.data);
      });
    }
  }, [params.owner, params.repository]);

  const handleVolver = () => {
    window.history.back();
  };

  const handleRedirectRepository = (url) => {
    window.open(url, '_blank');
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.current.show({
      severity: 'success',
      summary: 'URL Copiada',
      detail: 'La URL del repositorio ha sido copiada al portapapeles',
      life: 3000,
    });
  };

  const footerTemplate = (options) => {
    const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;
    return (
      <div className={className}>
        <span className="p-text-secondary">Ultima actualizacion: {repository.updated_at}</span>
      </div>
    );
  };

  const headerTemplate = (options) => {
    const className = `${options.className} justify-content-space-between`;
    return (
      <div className={className}>
        <div className="headerTemplate__header">
          <Avatar image={repository.owner.avatar_url} size="large" shape="circle" />
          <span className="headerTemplate__header_name">{repository.full_name}</span>
        </div>
        <div className="headerTemplate__header_buttons">
          <button className="headerTemplate__header_clone_btn" onClick={() => handleCopyUrl(repository.clone_url)}>
            <span className="pi pi-clone"></span>
            <p className="p-button-label p-ml-1">Clonar</p>
          </button>
          <button
            className="headerTemplate__header_clone_btn"
            onClick={() => handleRedirectRepository(repository.html_url)}
          >
            <span className="pi pi-eye"></span>
            <p className="p-button-label p-ml-1">Visitar Repositorio</p>
          </button>
        </div>
      </div>
    );
  };

  return (
    <section>
      <button className="repositoryDetails__volver" onClick={handleVolver}>
        Volver al listado
      </button>
      {repository ? (
        <div className="repositoryDetails__container">
          <Panel footerTemplate={footerTemplate} headerTemplate={headerTemplate} style={{ margin: '20px' }}>
            <h1>{repository.name}</h1>
            <p>Description: {repository.description}</p>
            <p>Star: <span className="pi pi-star"></span>{repository.stargazers_count}
            </p>
            <p>Lenguaje: {repository.language}</p>
            <p>Fecha de Creación: {repository.created_at}</p>
            <p>Última Actualización: {repository.updated_at}</p>
            <p>Tamaño: {repository.size} KB</p>
            <div className="repository__user">
              <h4>Datos del Usuario</h4>
              <p>Username: {repository.owner.login}</p>
              <p>
                URL: <a href={repository.owner.html_url} target="_blank">{repository.owner.html_url}</a>
              </p>
              <p>Tipo de Cuenta: {repository.owner.type}</p>
            </div>
          </Panel>
        </div>
      ) : (
        <p>Cargando ...</p>
      )}
      <Toast ref={toast} />
    </section>
  );
};
