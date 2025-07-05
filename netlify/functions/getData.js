exports.handler = async function (event, context) {
  const session = process.env.REVEL_SESSION;
  const contestName = 'ahc049';

  const url = `https://atcoder.jp/contests/${contestName}/results/json`;

  try {
    const res = await fetch(url, {
      headers: {
        'Cookie': `REVEL_SESSION=${session}`,
      }
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: `AtCoder responded with ${res.status}` })
      };
    }

    const json = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(json),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Fetch failed', details: err.message })
    };
  }
}