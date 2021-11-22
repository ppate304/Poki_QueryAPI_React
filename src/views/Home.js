
import React, { Component } from 'react'
import * as Yup from 'yup';
import {Formik, Field, Form} from 'formik';
import Table from 'react-bootstrap/Table'


const formSchema = Yup.object().shape({
        "pokiName": Yup.string().typeError('You must specify a name').required("Required")
})
const initialValues = {
    pokiName: '',

}

export default class Home extends Component {

    constructor() {
        super();
        this.state={
            pokemon:[],
            badname:false
        };
    }

    handleSubmit=({pokiName})=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokiName}`)
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                pokemon:[data],
                badname: false
            }, ()=>console.log(this.state.pokemon))
        })
        .catch(error=>{console.error(error); this.setState({badname:true})})
    }


        render() {
            return (
                <div>
                   <h1>Search Pokemon </h1>
                   {this.state.badname ? <small style={{color:"red"}}>Invalid Name</small>:""}
                   <Formik initialValues={initialValues}
                            validationSchema={formSchema}
                            onSubmit={
                                (values, {resetform})=>{
                                    this.handleSubmit(values);
                                    resetform(initialValues)
                                }
                            }
                            >
                            {
                                    ({errors, touched})=>(
                                    <Form>
                                        <label htmlFor="pokiName" className="form-label">Name</label>
                                        <Field name="pokiName" className="form-control" />
                                        {errors.pokiName && touched.pokiName ? (<div style={{color:'red'}}>{errors.season}</div>):null}
                                        
                                        <button type="submit" className="btn btn-primary">Search</button>
    
                                    </Form>   
                                    )
                                }
                    </Formik>
                     {/* racer table starts here */}
                {this.state.pokemon?.length > 0  ?
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Abilities</th>
                            <th>Base Experience</th>
                            <th>Sprite</th>
                            <th>HP</th>
                            <th>attack</th>
                            <th>defense</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.pokemon.map(
                                poki => (
                                    <tr key={poki.forms[0].name}>
                                        <td>{poki.forms[0].name}</td>
                                        <td>{poki.abilities[0].ability.name}</td>
                                        <td>{poki.base_experience}</td>
                                        <td> <img src = '{poki.front_shiny}'></img></td>
                                        <td> {poki.stats[0].base_stat}</td>
                                        <td>{poki.stats[1].base_stat}</td>
                                        <td>{poki.stats[2].base_stat}</td>                                    
                                    </tr>
                                )
                            )
                            
                            }
                        </tbody>
                    </Table>
                :''}

            </div>
        )
    }
}

             



// // // handleSubmit=({pokiName})=>{
// // //     fetch(`https://pokeapi.co/api/v2/pokemon/${pokiName}`)
// // //         .then(res=>res.json())
// // //         .then(data=>{
// // //             this.setState({
// // //                 pokiNames: data,
// // //                 badRound: false
// // //             }, ()=>console.log(this.state.pokiNames))
// // //         })
// // //         .catch(error=>{console.error(error); this.setState({badRound:true})})
// // // }

// render() {
//     return (
//         <div>
//             <h1>Search Pokemon Names</h1>
//             {/* {this.state.badRound ? <small style={{color:"red"}}>Invalid Name</small>:""} */}
//             <Formik initialValues={initialValues}
//                     validationSchema={formSchema}
//                     onSubmit={()=>console.log("Form Suubmitted")
//                         }
                    
//                     >
//                     {
//                         ({errors, touched})=>(
//                             <Form>
//                                 <label htmlFor="pokiName" className="form-label">Search Name</label>
//                                 <Field name="pokiName" className="form-control" />
//                                 {errors.pokiName && touched.pokiName ? (<div style={{color:'red'}}>{errors.pokiName}</div>):null}

//                                 <button type="submit" className="btn btn-primary">Search</button>

//                             </Form>
//                         )
//                     }

//             </Formik>
//             </div>

//     )
// }
