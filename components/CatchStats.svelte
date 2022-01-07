<script>

    import { rates } from "../stores/rates.js";

    export let ball = {};
    export let pokemon = {};
    export let health = 50;

    $: rateArray = $rates.filter((v) => v.type === ball.type);
    $: rate = rateArray.length ? rateArray.at(0) : {};
    $: isOpen = !!ball.name && !!pokemon.name && !!rate;
</script>



<footer class:isOpen on:click={()=>{isOpen = !isOpen}}>
    <h1>
        <span>{rate.success_percent}%</span> chance to capture <span>{pokemon.name}</span> @ <span>{health}%</span> health!
    </h1>
</footer>


<style>
    
    footer {
        padding: 20px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 200px;
        background: var(--bg);
        box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.15),
            inset 0 5px 25px rgba(255, 255, 255, 0.05);
        transition: all 0.3s cubic-bezier(.9,.03,.69,.22);
        transform: translateY(100%);
    }

    @supports (backdrop-filter: blur) {
        footer {
            background: #333844da;
            backdrop-filter: blur(5px);
        }
    }

    h1 {
        font-family: "Open Sans";
        font-weight: 100;
        margin: 0;
    }

    h1 span {
        font-weight: 700;
    }

    footer.isOpen {
        transition: all 0.3s cubic-bezier(.23,1,.32,1);
        transform: translateY(0);
    }

</style>