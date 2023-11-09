import React from 'react'
import { Pagination } from "react-bootstrap";
const Paginations = ({count,limit,setPage,page,setLimit}) => {
    let paginationItems=[]
  for(let i=1;i<Math.ceil(count/limit);i++){
    paginationItems.push( <Pagination.Item key={i} onClick={(e) => {setPage((prev) => i);}} active={page === i}>{i}</Pagination.Item>)
  }
const PaginationForUser = () => {
        return (
            <Pagination>
                <Pagination.Item key={0} onClick={(e) => {
                    setPage(prev => {
                        if (prev <= 1) {
                            return Math.ceil(count / limit)
                        }
                        return prev - 1
                    })
                   
                }}>prev</Pagination.Item>
                {paginationItems}
                <Pagination.Item key={0} onClick={(e) => {
                    setPage(prev => {
                        if (prev >= Math.ceil(count / limit)) {
                            return 1
                        }
                        return prev + 1
                    })
                   
                }}>next</Pagination.Item>



            </Pagination>
        )
    }
  return (
    <div>
        <PaginationForUser/>
    </div>
  )
}

export default Paginations