import {Button, Card, CardBody, CardFooter, CardHeader, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {useEffect, useState} from "react";
import axios from "axios";

const initialValues={
    ad:"",
    soyad:"",
    email:"",
    password:""
}
/*
export const errorMessages = {
    ad:"Adınızı en az 3 karakter giriniz!",
    soyad:"Soyadınızı en az 3 karakter giriniz!",
    email:"Geçerli bir email giriniz!",
    password:"En az 8 karakter, bir büyük harf, bir küçük harf, bir rakam ve bir sembol içeren bir şifre giriniz",
}
*/
export default function Register() {


    const [formData, setFormData] = useState(initialValues);
    const [id, setId] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
        if(name==="ad") {
            if(value.trim().length >= 3){
                setErrors({...errors, [name]: false});
            } else {
                setErrors({...errors, [name]: true});
            }
        }
        if(name==="soyad") {
            if(value.trim().length >= 3){
                setErrors({...errors, [name]: false});
            } else {
                setErrors({...errors, [name]: true});
            }
        }
        if(name==="email") {
            if(validateEmail(value)){
                setErrors({...errors, [name]: false});
            } else {setErrors({...errors, [name]: true});}
        }
        if(name==="password") {
            if(regex.test(value)){
                setErrors({...errors, [name]: false});
            } else {setErrors({...errors, [name]: true});}
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValid) return;
        axios.post("https://reqres.in/api/users", formData).then((res)=>{setFormData(initialValues)
        res.data.id}).catch((err) => {console.warn(err)})
    }

    const [errors, setErrors] = useState({
        ad: false,
        soyad: false,
        email: false,
        password: false
    });

    const [isValid, setIsValid] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    let regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    useEffect(() => {
        if(formData.ad.trim().length >= 3 && formData.soyad.trim().length >= 3 && validateEmail(formData.email) && regex.test(formData.password))
        {
            setIsValid(true);
        }
        else {
            setIsValid(false);
        }
    }, [formData]);

    return(
    <Card>
        <CardHeader>Kayıt Sayfası</CardHeader>
        <CardBody>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="ad">
                    Ad:
                </Label>
                <Input
                    id="ad"
                    name="ad"
                    placeholder="Adınızı giriniz"
                    type="text"
                    onChange={handleChange}
                    value={formData.ad}
                    invalid={errors.ad}
                    data-cy="ad-input"
                />
                {errors.ad && <FormFeedback data-cy="error-message">
                    {errorMessages.ad}
                </FormFeedback>}

            </FormGroup>
            <FormGroup>
                <Label for="soyad">
                    Soyad
                </Label>
                <Input
                    id="soyad"
                    name="soyad"
                    placeholder="Soyadınızı giriniz"
                    type="text"
                    onChange={handleChange}
                    value={formData.soyad}
                    invalid={errors.soyad}
                    data-cy="soyad-input"
                />
                {errors.soyad && <FormFeedback data-cy="error-message">
                    {errorMessages.soyad}
                </FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label for="email">
                    Email
                </Label>
                <Input
                    id="email"
                    name="email"
                    placeholder="Email giriniz"
                    type="email"
                    onChange={handleChange}
                    value={formData.email}
                    invalid={errors.email}
                    data-cy="email-input"
                />
                {errors.email && <FormFeedback data-cy="error-message">
                    {errorMessages.email}
                </FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label for="password">
                    Password
                </Label>
                <Input
                    id="password"
                    name="password"
                    placeholder="Güçlü bir şifre giriniz"
                    type="password"
                    onChange={handleChange}
                    value={formData.password}
                    invalid={errors.password}
                    data-cy="password-input"
                />
                {errors.password && <FormFeedback data-cy="error-message">
                    {errorMessages.password}
                </FormFeedback>}
            </FormGroup>
            <Button disabled={!isValid} data-cy="submit-button">
                Kaydol
            </Button>
        </Form>
    </CardBody>
        <CardFooter data-cy="res-message">ID: {id}</CardFooter>
    </Card>
    );


}




