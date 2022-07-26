import Movements from './movements.js';
import blockchain from './Web3.js';
import abi from './abi/abi.json' assert{type: "json"};

//Declaration of a new scene on with Three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000055)

//Camera and renderer configuration
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Setting scene Lights
const ambient_light = new THREE.AmbientLight(0xbda355);
const direction_light = new THREE.DirectionalLight(0xffffff, 1);
ambient_light.add(direction_light);
scene.add(ambient_light)

//Setting up a flat space of the Metaverse
const geometry_space = new THREE.BoxGeometry(100, 0.2, 50);
const material_space = new THREE.MeshPhongMaterial({color: 0xffffff});
const space = new THREE.Mesh(geometry_space, material_space);
scene.add(space);


//Geometry figure of CUBE
const geometry_cube = new THREE.BoxGeometry();
const material_cube = new THREE.MeshPhongMaterial({ color: 0x0000CC});
const cube = new THREE.Mesh( geometry_cube, material_cube);
scene.add( cube );
camera.position.z = 5;
camera.position.set(10,5,40);


//Geometric figure of CONE
const geometry_cone = new THREE.ConeGeometry( 5, 20, 32 );
const material_cone = new THREE.MeshPhongMaterial( {color: 0xed810a} );
const cone = new THREE.Mesh( geometry_cone, material_cone );
cone.position.set(-10,5,10);
scene.add( cone );

//Geometric figure of Cilinder
const geometry_cilinder = new THREE.CylinderGeometry( 5, 5, 5, 32 );
const material_cilinder = new THREE.MeshPhongMaterial( {color: 0xff0000} );
const cylinder = new THREE.Mesh( geometry_cilinder, material_cilinder );
cylinder.position.set(20,5,0);
scene.add( cylinder );

function animate(){
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.01;
    cone.rotation.x += 0.01;
    cone.rotation.y += 0.01;
    cylinder.rotation.x += 0.1;
  

    //camera.position.x += 0.01;
    requestAnimationFrame(animate);

    // Movement to the left
    if (Movements.isPressed(37)) {
        camera.position.x -= 0.5;
    }
    // Upward movement
    if (Movements.isPressed(38)) {
        camera.position.x += 0.5;
        camera.position.y += 0.5;
    }
    // Movement to the right
    if (Movements.isPressed(39)) {
        camera.position.x += 0.5;
    }
    // Downward movement
    if (Movements.isPressed(40)) {
        camera.position.x -= 0.5;
        camera.position.y -= 0.5;
    }

    camera.lookAt(space.position);

    renderer.render(scene, camera);
}
animate();

// Create new nft
const buttonMint = document.getElementById('mint');
buttonMint.addEventListener('click', mintNFT);

function mintNFT(){
    //Parameters to create a NFT in the metaverse.
    var nft_name = document.getElementById("nft_name").value;
    var nft_width = document.getElementById("nft_width").value;
    var nft_height = document.getElementById("nft_height").value;
    var nft_depth = document.getElementById("nft_depth").value;
    var nft_x = document.getElementById("nft_x").value;
    var nft_y = document.getElementById("nft_y").value;
    var nft_z = document.getElementById("nft_z").value;
    




    // If network is not available
    if(typeof window.ethereum == 'undefined'){
        rej("Install Metamask!")
    }
    //Web3 Instance
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, '0x757E42b6BeFd38E4a1AD998b2bC3C079220F8dF4');

    web3.eth.getAccounts().then((accounts) => {
        contract.methods.mint(nft_name, nft_width, nft_height, nft_depth, nft_x, nft_y, nft_z).send({ from: accounts[0], value: '10000000000000000' }).then((data) => {
            console.log("NFT available in the Metaverse!");
        });
    });
    
}



blockchain.then((result) => {
    // For each building paid for in the Smart Contract,
    // a graphical representation is made in the Metaverse
    result.building.forEach((building, index) => {
        if (index <= result.supply) {
            // Representation of NFT Tokens as boxes
            const boxGeometry = new THREE.BoxGeometry(building.w, building.h, building.d);
            const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x33fffc });
            const nft = new THREE.Mesh(boxGeometry, boxMaterial);
            nft.position.set(building.x, building.y, building.z);
            scene.add(nft);
        }
    })


})