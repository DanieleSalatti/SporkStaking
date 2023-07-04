import Head from "next/head";

function CustomHead() {
  return (
    <Head>
      <title>SporkDAO $SPORK Staking App</title>
      <meta name="description" content="SPORK staker created with 🏗 scaffold-eth" />
      <link
        rel="icon"
        type="image/x-icon"
        href="https://images.squarespace-cdn.com/content/v1/614b990e002ad146a5478e8b/244c7b82-0ee2-45ea-830f-50c450ed2985/favicon.ico?format=100w"
      ></link>
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href="https://images.squarespace-cdn.com/content/v1/614b990e002ad146a5478e8b/244c7b82-0ee2-45ea-830f-50c450ed2985/favicon.ico?format=100w"
      ></link>
      <link rel="canonical" href="https://stake.ethdenver.com" />
      <meta property="og:site_name" content="SporkDAO Spork Staking App"></meta>
      <meta
        property="og:image"
        content="https://images.squarespace-cdn.com/content/v1/614b990e002ad146a5478e8b/1658775809172-JATIARTTTVEO3ZN5KDVW/SPORKDAO_LOVE.png?format=300w"
      ></meta>
      <meta
        name="twitter:image"
        content="https://images.squarespace-cdn.com/content/v1/614b990e002ad146a5478e8b/1658775809172-JATIARTTTVEO3ZN5KDVW/SPORKDAO_LOVE.png?format=300w"
      ></meta>
      <meta name="twitter:url" content="https://stake.ethdenver.com"></meta>
      <meta name="twitter:card" content="summary"></meta>
      <meta name="twitter:description" content="SporkDAO members can stake and unstake their spork here!"></meta>
      <meta name="description" content="SporkDAO members can stake and unstake their spork here!"></meta>
    </Head>
  );
}

export default CustomHead;
