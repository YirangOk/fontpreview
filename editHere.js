// 1. name: 웹 페이지에 표시될 폰트의 이름입니다. 이 이름은 사용자 인터페이스에 직접 보여지며,
//    사용자가 폰트를 선택할 때 표시되는 이름입니다.
// 2. url: 폰트 파일이 저장된 위치의 URL입니다. 이 URL은 웹 페이지에서 해당 폰트를
//    불러오기 위해 사용됩니다. 폰트 파일은 서버의 해당 경로에 저장되어 있어야 합니다. 
//    기존에 저장된 위치는 fonts woff가 저장되어 있습니다.
// 3. text: 미리보기에 보여질 본문입니다.

const fonts = [{
    name: '노토산스 Regular',
    url: 'fonts/NotoSans-Regular.woff'
  }, {
    name: '노토산스 Medium',
    url: 'fonts/NotoSans-Medium.woff'
  }, {
    name: '노토산스 Bold',
    url: 'fonts/NotoSans-Bold.woff'
  }];

function insertText() {
  const text = `포스트스크립트(PostScript, PS)는 어도비 시스템을 설립한 존 워낙(John Warnock)과 찰스 게시케(Charlse Geschke)가 만든 페이지 기술 언어의 일종이다. 스크립트라는 말 그대로
  포스트스크립트 파일은 사람이 읽을 수 있게끔 되어있으며, 실제로 PCL 언어와는 달리 바이너리화되어있지 않아서 텍스트편집기 등에서 ISOLatin1 언어 포맷으로 읽을 수 있고, 또한 장치에 독립적일 수도
  있다. 그러나 포스트스크립트를 지원하는 프린터나, 드라이버를 제작하는 것이 비교적 어렵고, 또한 프린터 내부적으로 해석과정을 거친 후에 바이너리화를 해야 하기 때문에 프린터 내부 프로세싱이 많이 요구된다.
  1985년 애플이 처음으로 포스트스크립트 엔진을 포함한 프린터 레이저라이터를 출시했으며, 이로부터 탁상 출판의 혁명이 시작되었다. 한때는 그래픽 처리의 사실상 표준이었으나 최근에는 PDF에게 점점 그 자리를
  내주고 있다. 또한 운영 체제나 응용 프로그램에서 포스트스크립트 파일을 처리하는 경우가 많기 때문에, 프린터에 포스트스크립트 엔진을 포함하는 경우도 줄고 있다.`;

  document.getElementById('editableDiv').innerHTML = text;
}

window.onload = insertText;
