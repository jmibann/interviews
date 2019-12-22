import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import TemplatesGrid from './TemplatesGrid';
import TemplateModals from './TemplateModals';

import { fetchTemplates, deleteTemplate, editTemplate } from '../../../redux/action-creator/template';

const DELETE = 'DELETE';
const EDIT = 'EDIT';

const Templates = ({ user, history }) => {
  const [id, setId] = useState({});
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableState, setTableState] = useState({});
  const [whichComponent, setWhichComponent] = useState(null);

  useEffect(() => {
    const loadTemplates = async () => await fetchTemplates(user, 0, 100).then(templates => {
      setTemplates(templates);
      setIsLoading(false)
    })

    setIsLoading(true);
    loadTemplates();
  }, [])

  const toggleState = (whichComponent) => {
    setWhichComponent(whichComponent);
    setIsModalOpen(!isModalOpen);
  };


  const openEditTemplateModal = (id) => {
    setId(id);
    setWhichComponent(EDIT);
    setIsModalOpen(true)
  };

  const openDeleteModal = (id) => {
    setId(id);
    setWhichComponent(DELETE);
    setIsModalOpen(true)
  };

  const closeModal = (e) => { setIsModalOpen(false) };

  const refreshTable = () => {
    setIsLoading(true);
    let { pageSize, page, sorted, filtered } = { ...tableState };
    fetchTemplates(user, page, pageSize, sorted, filtered)
      .then(templates => {
        setTemplates(templates);
        setIsLoading(false);
      })
  }

  const remove = () => {

    deleteTemplate(id).then(() => refreshTable()).then(() => closeModal());
  }

  return (
    <div>
      {isModalOpen
        ? <TemplateModals whichComponent={whichComponent} isModalOpen={isModalOpen} closeModal={closeModal} refreshTable={refreshTable} id={id} remove={remove} />
        : null}

      <div className='react-table'>
        <TemplatesGrid
          user={user}
          templates={templates}
          setTemplates={setTemplates}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setTableState={setTableState}
          refreshTable={refreshTable}
          openEditTemplateModal={openEditTemplateModal}
          openDeleteModal={openDeleteModal}
          history={history}
        />
      </div>

    </div>
  );
}

export default Templates;