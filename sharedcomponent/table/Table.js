import React from 'react'
import Paginations from '../pagination/Paginations';
import './Table.css'
import { Button } from 'react-bootstrap';


const Table = ({data,count,limit,setPage,page,setLimit,updateButton,deleteButton,viewButton,updateFunction,setShow,deleteFunction,infoFunction}) => {
    let headerOfUserTable, rowsOfUserTable;
    if (data.length > 0) {
     let key=Object.keys(data[0])
     
      headerOfUserTable = Object.keys(data[0]).map((k) => {
        return (
          <>  
            <th>{k}</th>
          </>
        );
      });
 
      rowsOfUserTable = data.map((d) => {
        let singleRow=[]

        for(let i=0;i<key.length;i++){
            if(d[key[i]]===true){
                
                singleRow.push(<td>true</td>)
            }
            if(d[key[i]]===false){
                singleRow.push(<td>false</td>)
            }

            
              singleRow.push(<td>{d[key[i]]}</td>)
               
            
  
        }
        if(updateButton==true){
          singleRow.push(<td><button className='btn-primary1'onClick={()=>{updateFunction(d)
            setShow((prev)=>true)}}>Update</button></td>)
        }
        if(deleteButton==true){
          singleRow.push(<td><button className='btn-primary2'onClick={()=>{deleteFunction(d)}}>Delete</button></td>)
        }
        if(viewButton==true){
          singleRow.push(<td><button className='btn-primary3'onClick={()=>{infoFunction(d)}}>view</button></td>)
        }
      
        return (
          <tr>
         {singleRow}
         
         
          </tr>
        );
      });
    }
  
    const TableOfUsers = () => {
      return (
        <>



             <table class="table">
            
          <thead>
        
            <tr>{headerOfUserTable}</tr>
          </thead>
          <tbody>{rowsOfUserTable}</tbody>
        </table>
        </>
        
      );
    };
  return (
    <div className='part'>
      <div className='main'>
      <div>
      
        <Paginations count={count} limit={limit}  setPage={setPage} page={page}/>
      </div>
      <div>
          <select
          class="form-select"
          aria-label="Default select example"
          onClick={(e) => {
            setLimit((prev) => e.target.value);
      
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
       
        </div>
      </div>
      
           
        <TableOfUsers/>
    </div>

  )
}

export default Table