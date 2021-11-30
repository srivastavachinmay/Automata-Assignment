import React, {useRef, useState}                  from 'react'
import {Container, Form, Button, Image,FormLabel} from 'react-bootstrap'
import axios                                      from "axios";
import "./DfaInput.css"

function DfaInput() {
    const inputRef = useRef();
    const statesRef = useRef();
    const initialRef = useRef();
    const finalRef = useRef();
    const transitionRef = useRef();

    const [p, setP] = useState(false)
    const [post, setPost] = useState(null);
    const [input, setInput] = useState([])
    const [states, setStates] = useState([])
    const [initial, setInitial] = useState("")
    const [final, setFinal] = useState([])
    const [transition, setTransition] = useState(null)


    async function handleSubmit(e) {
        e.preventDefault()
        console.log(initialRef.current.value)
        setInput(inputRef.current.value.split(','))
        setFinal(finalRef.current.value.split(','))
        setInitial(initialRef.current.value)
        setStates(statesRef.current.value.split(','))
        setTransition(JSON.parse(transitionRef.current.value))
        const json = {
            "states": states.map(e => e.trim()),
            "input_sym": input.map(e => e.trim()),
            "transitions": transition,
            "initial": initial,
            "final": final.map(e => e.trim())
        }
        console.log(JSON.stringify(json, null, 2))
        axios.post('http://127.0.0.1:5000/dfa', json).then((response) => {
            setPost(response.data)
            setP(true)
            // console.log(JSON.stringify(response.data))
            console.log(post)
        })


        console.log(post)
    }


    const trans = `
        {"A": {"a": "B", "b": "D"},
        "B": {"a": "B", "b": "C"},
        "C": {"a": "B", "b": "C"},
        "D": {"a": "D", "b": "D"}}
    `
    return (
        <Container className="kucchBhi align-items-center d-flex" style={{height: '100vh'}}>
            <Form onSubmit={handleSubmit} className='w-100'>
                <Form.Group className={'mb-2'}>
                    <Form.Label className={'fw-bolder'}>
                        DFA Inputs
                    </Form.Label>
                </Form.Group>
                <Form.Group className={'mb-2'}>
                    <Form.Label>
                        Enter Finite set of states
                    </Form.Label>
                    <Form.Text className={'m-4'}>
                        Format: A, B, C, D

                    </Form.Text>
                    <Form.Control type={"text"} ref={statesRef} required/>
                </Form.Group>
                <Form.Group className={'mb-2'}>
                    <Form.Label>
                        Enter Input Symbols
                    </Form.Label>
                    <Form.Text className={'m-4'}>
                        Format: a,b

                    </Form.Text>
                    <Form.Control type={"text"} ref={inputRef} required/>
                </Form.Group>
                <Form.Group className={'mb-2'}>
                    <Form.Label>
                        Enter Initial state
                    </Form.Label>
                    <Form.Text className={'m-4'}>
                        Format: A

                    </Form.Text>
                    <Form.Control type={"text"} ref={initialRef} required/>
                </Form.Group>
                <Form.Group className={'mb-2'}>
                    <Form.Label>
                        Enter set of Final States
                    </Form.Label>
                    <Form.Text className={'m-4'}>
                        Format: C,B

                    </Form.Text>
                    <Form.Control type={"text"} ref={finalRef} required/>
                </Form.Group> <Form.Group className={'mb-2'}>
                <Form.Label>
                    Enter Transition Function
                </Form.Label>
                <Form.Text className={'m-4'}>
                    Format:{trans}

                </Form.Text>
                <Form.Control type={"text"} ref={transitionRef} required/>
            </Form.Group>


                <Button type='submit' className="me-2">Submit</Button>

            </Form>
            <div className="output-images">
                {p ? <Container className={'fw-bold m-4'}>
                    <FormLabel>
                        DFA
                    </FormLabel>
                    <Image src={post['dfa_link']}/></Container> : null}
                {p ? <Container className={'fw-bold m-4'}>
                    <FormLabel>
                        Complement DFA
                    </FormLabel>
                    <Image src={post['complement_dfa_link']}/></Container> : null}
                {p ? <Container className={'fw-bold m-4'}>
                    <FormLabel>
                        Reverse DFA
                    </FormLabel>
                    <Image src={post['reverse_nfa_link']}/></Container> : null}
            </div>

        </Container>
    )
}

export default DfaInput