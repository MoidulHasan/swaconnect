// dependencies
const serviceCarrier = require("./generalOperations");
const Encrypter = require("../../utilities/crpyto");
const { json } = require("express/lib/response");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const encrypter = new Encrypter(process.env.SECRET_KEY);

// module scafoldings

const communication321 = {};



// find all data of 321Communication
communication321.carrierData = async () => {
    return await serviceCarrier.serviceCarrierData(101);
};

// fetch coverage by zip code
const fetchCoverage2 = async (data) => {
    // fetch data from the getCoverage api url
    await fetch('http://wirelssapi.321communications.com/API/GetCoverage2', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then((result) => result.json())
        .then((data) => {
            // console.log(data);
            if (data) {
                return data;
            }
        }).catch((error) => {
            return false;
        });
}


// Get coverage by zip code
communication321.getCoverage2 = async (zipcode) => {
    // find service carrier data from database
    let data = await communication321.carrierData();
    data = data.data;


    // construct post data with dencrypted Crediantials and zipcode
    const postData = {
        Credential: {
            CLECID: await encrypter.dencrypt(data.clecid),
            UserName: await encrypter.dencrypt(data.apiUserName),
            TokenPassword: await encrypter.dencrypt(data.apiTokenPassword),
            PIN: await encrypter.dencrypt(data.apiPin),
        },
        Zip: zipcode
    }


    const coverage = await fetchCoverage2(postData);
    // console.log(coverage)

    // return coverage data
    return coverage;

}


// export module
module.exports = communication321;