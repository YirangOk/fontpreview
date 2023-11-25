function convertText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        const writingMode = getComputedStyle(node.parentElement).writingMode;

        if (writingMode === 'vertical-rl') {
            const text = node.textContent;
            const convertedText = text
                .replace(/,/g, '、')
                .replace(/\./g, '。')
                .replace(/"([^"]*)"/g, '『$1』')
                .replace(/'([^']*)'/g, '「$1」')
                .replace(/‘/g, '「')
                .replace(/’/g, '」')
                .replace(/“/g, '『')
                .replace(/”/g, '』');

            node.textContent = convertedText;
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (const childNode of node.childNodes) {
            convertText(childNode);
        }
    }
}

function revertGlyphs(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        const convertedText = node.textContent
            .replace(/、/g, ',')
            .replace(/。/g, '.')
            .replace(/『([^』]*)』/g, '"$1"')
            .replace(/「([^」]*)」/g, "'$1'")
            .replace(/「/g, '‘')
            .replace(/」/g, '’')
            .replace(/『/g, '“')
            .replace(/』/g, '”');

        node.textContent = convertedText;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (const childNode of node.childNodes) {
            revertGlyphs(childNode);
        }
    }
}
