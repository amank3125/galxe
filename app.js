const apiUrl = 'https://graphigo.prd.galaxy.eco/query';
  
const query = `
  query CampaignList(
    $id: Int
    $alias: String
    $campaignInput: ListCampaignInput!
  ) {
    space(id: $id, alias: $alias) {
      id
      name
      alias
      campaigns(input: $campaignInput) {
        pageInfo {
          endCursor
          hasNextPage
        }
        list {
          id
          name
        }
      }
    }
  }
`;

const variables = {
  "alias": "Quai",
  "campaignInput": {
    "forAdmin": false,
    "first": 2,
    "after": "-1",
    "excludeChildren": true,
    "gasTypes": null,
    "credSources": null,
    "rewardTypes": null,
    "chains": null,
    "statuses": null,
    "listType": "Newest",
    "types": [
      "Drop",
      "MysteryBox",
      "Forge",
      "MysteryBoxWR",
      "Airdrop",
      "ExternalLink",
      "OptIn",
      "OptInEmail",
      "PowahDrop",
      "Parent",
      "Oat",
      "Bounty",
      "Token",
      "DiscordRole",
      "Mintlist",
      "Points",
      "PointsMysteryBox"
    ],
    "searchString": null
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
    console.log('GraphQL Response:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();