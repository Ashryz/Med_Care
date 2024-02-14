//1 nav bar --> yussef
//2 home if user logged in he will see the list docs and can go to his profile and the doctor profile
//3 login ---> store the user id in the local storage or state and redirect to home -->tarek
//4 user profile---> issra / doc profile
//5 register as a doctor or as a patient ----> sroe the data -->mohamed
//list docs is a component that will take the list of doctors and render them
//doc profile will take the id of the doctor and render his profile







const users = //<------ Pationts users
    [
        {
            id: 'p_1',
            uname: 'John Doe',//reg
            fnmae: 'John',//reg
            lname: 'Doe',//reg
            email: 'examplemail',//reg
            paswwrod: '123456',//reg
            dob: '12/12/1999',//reg
            gender: 'Male',//reg
            phone: '1234567890',//reg
            imgleink: 'https://www.google.com',//exclude it
            area: 'cairo',//reg

        },
        {
            id: 'p_2',
            uname: 'Jane Doe',
            fnmae: 'Jane',
            lname: 'Doe',
            email: 'examplemail',
            paswwrod: '123',
            dob: '12/12/1999',
            gender: "female",
            phone: '1234567890',
            imgleink: 'https://www.google.com',
            area: 'cairo',
        }
    ]

const docs = [
    //exclude the clincs and rating and reviews and imgelink when regsiter 
    {
        id: 'd_1',
        uname: 'Jane Doe',
        fnmae: 'Jane',
        lname: 'Doe',
        email: 'examplemail',
        paswwrod: '123',
        dob: '12/12/1999',
        gender: "female",
        phone: '1234567890',
        imgleink: 'https://www.google.com',
        area: 'cairo',
        specilization: 'dentist',

        //exclude the rest from it
        clinic: [
            "clinic_1",
            "clinic_2"
        ],

        degree: 'master',
        rating: [],
        reviews: [],
        fees: 100,
    }

]