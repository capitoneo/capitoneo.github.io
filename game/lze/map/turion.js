function parseTsv(tsv) {
    return tsv.split('\n').slice(1).map((e) => e.split('\t')).map(parseQuest);
}

function parseQuest(questEntry) {
    return {
        "id": questEntry[0],
        "questName": questEntry[1],
        "itemName": questEntry[2],
        "fileName": questEntry[3],
        "locX": questEntry[4],
        "locY": questEntry[5]
        };
}

const controlsParent = document.querySelector('#controls');
const map = document.querySelector('#map');
controlsParent.addEventListener('click', updateMap);

/* GENERATE CONTROL ITEMS AND MAP MARKERS */
function genData(questList){
    /* Controls */
    for (const itemData of questList) {
        const toggleGroup = document.createElement('div');
        toggleGroup.classList.add('toggle-group');
        toggleGroup.setAttribute('id', `id-${itemData.id}`);

        // ADD item thumbnail
        const thumbnailBox = document.createElement('div');
        thumbnailBox.classList.add('thumbnail');
        const url = `url('./images/${itemData.fileName}')`;
        thumbnailBox.setAttribute('style', `background-image: ${url}`);
        toggleGroup.append(thumbnailBox);

        // ADD quest name
        const questName = document.createElement('p');
        questName.innerText = itemData.questName;
        toggleGroup.append(questName);

        // ADD item name
        const itemName = document.createElement('span');
        itemName.innerText = itemData.itemName;
        toggleGroup.append(itemName);

        //DISABLED items
        if (itemData.locX == 0 && itemData.locY == 0) {
            toggleGroup.setAttribute('disabled','');
        }
        controlsParent.append(toggleGroup);
    }
    /* Map Markers */
    for (const itemData of questList) {
        const mapMarker = document.createElement('div');
        mapMarker.classList.add('quest-item');
        mapMarker.setAttribute('id', `id-${itemData.id}-icon`);
        const url = `url('./images/${itemData.fileName}')`;
        mapMarker.style.cssText = `
              background-image: ${url};
              left: ${itemData.locX}%;
              top: ${itemData.locY}%;
            `;
        map.append(mapMarker);
    }
}

function updateMap(event){
    const target = event.target;
    if (target.classList.contains('toggle-group')){
        let targetName = target.getAttribute('id');
        let targetNodeId = '#'+targetName+'-icon'
        let targetNode = document.querySelector(targetNodeId);
        targetNode.classList.toggle('active');
        target.classList.toggle('active');
    }
}

function searchFunction() {
    let input, filter, ul, li, textP, textSpan, i, txtValue, txtValue2;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("controls");
    li = ul.getElementsByClassName("toggle-group");
    for (i = 0; i < li.length; i++) {
        textP = li[i].getElementsByTagName("p")[0];
        textSpan = li[i].getElementsByTagName("span")[0];
        txtValue = textP.textContent || textP.innerText;
        txtValue2 = textSpan.textContent || textSpan.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function mapClear() {
    const activeItems = document.querySelectorAll(".active");
    for (let i = 0; i < activeItems.length; i++) {
        activeItems[i].classList.remove("active");
    }
}

var tsvXhttp = new XMLHttpRequest();
tsvXhttp.onreadystatechange = function() {
        if (tsvXhttp.readyState == 4 && tsvXhttp.status == 200) {
                genData(parseTsv(tsvXhttp.responseText.trim()));
        };
};
tsvXhttp.open("GET", "./turion.tsv", true);
tsvXhttp.send();
