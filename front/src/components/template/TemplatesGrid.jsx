import React, { useState } from 'react';
import Pagination from '../../helpers/Pagination';
import ReactTable from 'react-table';
import Button from '../app/Button';
import columnsCreator from './columnsCreator';
import './createtemplate.css';

import { fetchTemplates } from '../../../redux/action-creator/template'

const TemplatesGrid = ({ isLoading, setIsLoading, setTemplates, setTableState, openEditTemplateModal, openDeleteModal, history }) => {

  const [pages, setPages] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(0);

  const requestData = (pageSize, page, sorted, filtered) => {
    setCurrentPage(page);
    setIsLoading(true);

    fetchTemplates(page, pageSize, sorted, filtered).then(templates => {
      const totalTemplatesFound = templates.length;
      setPages(Math.ceil(totalTemplatesFound / pageSize));
      setTemplates(templates);
      setIsLoading(false);
    });
  };

  const columns = columnsCreator(openDeleteModal, openEditTemplateModal);

  const templates = [{
    name: ".NET 2019",
    skills: ["SQL - Serve"],
    user: "James Bond"
  },
  {
    name: "Java Technician",
    skills: ["hibernate - colections"],
    user: "James Bond"
  },
  {
    name: "Supercompilado JS 2019",
    skills: ["bootstrap - redux - hooks"],
    user: "James Bond"
  }]

  const onClick = () => { history.push('/newtemplate') }

  return (
    <div>
     <div className='button-left'>
        <button className="btn btn-orange pull-left no-margin" type="button" onClick={onClick} >
            <span>Create new template </span>
            <span className="glyphicon glyphicon-plus"></span>
        </button>
    </div>
      
      <ReactTable
        manual
        filterable
        minRows={0}
        nextText=">"
        previousText="<"
        columns={columns}
        data={templates}
        loading={isLoading}
        className="-striped -highlight"
        pages={pages}
        page={currentPage}
        defaultPageSize={pageSize}
        PaginationComponent={Pagination}
        getTdProps={() => ({ style: { display: 'flex', flexDirection: 'column', justifyContent: 'center' } })}
      />
    </div >
  );
};

export default TemplatesGrid;