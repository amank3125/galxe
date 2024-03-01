const apiUrl = 'https://graphigo.prd.galaxy.eco/query';
let h1 = document.querySelector('.text');

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
        "address": "0x2647df0f29c94a2d50d15e7717a797a2815bc323"
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
  } catch (error) {
    h1.innerText = `Error fetching data: ${error}`;
  }
};

fetchData();