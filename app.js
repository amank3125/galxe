console.log('version 2')
const apiUrl = 'https://graphigo.prd.galaxy.eco/query';
let h1 = document.querySelector('.text');
var _address = document.querySelector('.address');
function buildData()
{
  if(_address.value!=''){
  fetchData();}
  else {
    alert('address cannot be empty!')
  }
}

const query = `
mutation SyncCredentialValue($input: SyncCredentialValueInput!) {
  syncCredentialValue(input: $input) {
    value {
      address
      spaceUsers {
        follow
        points
        participations
        __typename
      }
      campaignReferral {
        count
        __typename
      }
      gitcoinPassport {
        score
        lastScoreTimestamp
        __typename
      }
      walletBalance {
        balance
        __typename
      }
      multiDimension {
        value
        __typename
      }
      allow
      survey {
        answers
        __typename
      }
      quiz {
        allow
        correct
        __typename
      }
      __typename
    }
    message
    __typename
  }
}
`;

const variables = 
  {
    "input": {
      "syncOptions": {
        "credId": "385014941003821056",
        "address": `${_address.value}`
      }
    }
  };


const fetchData = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await response.json();
    h1.innerText = `GraphQL Response: ${data}`;
    if(Object.keys(data).includes('errors')){
      console.log(data.errors[0].message);
    }else {
      console.log(data.data);
    }
    
  } catch (error) {
    h1.innerText = `Error fetching data: ${error}`;
  }
};
