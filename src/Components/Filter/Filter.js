import Accordion from 'react-bootstrap/Accordion';
import './filter.css'
function Filter() {
  return (
    <div className='main'>
        <h6 className='text-center hed'>Filter</h6>
    
    <Accordion defaultActiveKey="0" id='acc'>
      <Accordion.Item eventKey="0">
        <Accordion.Header>titel</Accordion.Header>
        <Accordion.Body>
        <div className='input'>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> profesor</label>  
            </div>
            <div className='input'>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> Lecture</label>  
            </div>
            <div className='input'>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> consultant</label>  
            </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Gender</Accordion.Header>
        <Accordion.Body>
        <div className='input'>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> male</label>  
            </div>
            <div className='input'>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> female</label>  
            </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Avalabilty</Accordion.Header>
        <Accordion.Body>
        <div className='input'>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> Any Day</label>  
            </div>
            <div className='input'>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> to Day</label>  
            </div>
            <div className='input'>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> tomorro</label>  
            </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Entity</Accordion.Header>
        <Accordion.Body>
        <div className='input'>
              <input className="form-check-input"name="options" type="checkbox" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> Hospital</label>  
            </div>
            <div className='input'>
              <input className="form-check-input"name="options" type="checkbox" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> clinic</label>  
            </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Examination</Accordion.Header>
        <Accordion.Body>
        <div className='input'>
              <input className="form-check-input"name="options" type="radio" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> Any</label>  
            </div>
            <div className='input'>
              <input className="form-check-input"name="options" type="radio" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> less than 50</label>  
            </div>
            <div className='input'>
              <input className="form-check-input"name="options" type="radio" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> From 50 to 100</label>  
            </div>
            <div className='input'>
              <input className="form-check-input"name="options" type="radio" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> From 100 to 200</label>  
            </div>
            <div className='input'>
              <input className="form-check-input"name="options" type="radio" value="" id="flexCheckIndeterminate"/>
             <label className="form-check-label" for="flexCheckIndeterminate"> Grater than 300</label>  
            </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
  );
}

export default Filter;