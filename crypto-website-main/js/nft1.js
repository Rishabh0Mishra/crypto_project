const nftSlider = document.querySelector('#nft-slider');

function topNFTs() {
    nftSlider.innerHTML = '';
    axios.get(`https://api.coingecko.com/api/v3/search/trending`)
        .then(response => {
            let data = response.data.coins;
            data.forEach((val, idx) => {
                if (idx < 5) {
                    nftSlider.innerHTML += `
                    <div class="nft-item">
                        <div class="nft-image">
                            <figure>
                                <img src="${val.item.small}" alt="">
                            </figure>
                        </div> 
                        <div class="nft-rank">
                            <span>Rank</span>
                            <span>${val.item.market_cap_rank}</span>
                        </div>
                        <div class="nft-name">
                            <strong>${val.item.name}</strong>
                            <span>${val.item.symbol}</span>
                        </div>
                    </div>`;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching NFT data:', error);
        });
}

topNFTs();
