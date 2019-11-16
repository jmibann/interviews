import React, { useState } from 'react';
import Pagination from '../../helpers/Pagination';
import ReactTable from 'react-table';
import columnsCreator from './columnsCreator';

import { fetchCandidates } from '../../../redux/action-creator/candidate'

const CandidatesGrid = ({ user, candidates, isLoading, setIsLoading, setCandidates, setTableState, openEditCandidateModal, openDeleteModal }) => {

  const [pages, setPages] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(0);

  const requestData = (pageSize, page, sorted, filtered) => {
    setCurrentPage(page);
    setIsLoading(true);

    fetchCandidates(user, page, pageSize, sorted, filtered).then(candidates => {
      const totalCandidatesFound = candidates.length;
      setPages(Math.ceil(totalCandidatesFound / pageSize));
      setCandidates(candidates);
      setIsLoading(false);
    });
  };

  const columns = columnsCreator(user, openDeleteModal, openEditCandidateModal);

  return (
    <div className="react-table">
      <ReactTable
        manual
        filterable
        minRows={0}
        nextText=">"
        previousText="<"
        columns={columns}
        data={candidates}
        loading={isLoading}
        className="-striped -highlight"
        pages={pages}
        page={currentPage}
        defaultPageSize={pageSize}
        PaginationComponent={Pagination}
        onFetchData={(state, instance) => {
          let { pageSize, page, sorted, filtered } = { ...state }
          setTableState({ pageSize, page, sorted, filtered })
          requestData(state.pageSize, state.page, state.sorted, state.filtered)
        }}
        getTdProps={() => ({ style: { display: 'flex', flexDirection: 'column', justifyContent: 'center' } })}
      />
    </div>
  );
}

export default CandidatesGrid;