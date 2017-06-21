window.onerror = function (msg) {
  alert(JSON.stringify(msg));
};
// 元素
function el(query) {
  return document.querySelector(query);
}
// 显示
var show = function (el) {
  el.className = el.className.replace(/ hidden/g, '');
};
// 隐藏
var hide = function (el) {
  el.className.search(' hidden') == -1 && (el.className += ' hidden');
};
// 提示
var $tips = el('.tips');
var timer = null;
var tips = function (str) {
  clearTimeout(timer);
  $tips.style.opacity = '1';
  $tips.innerHTML = '<span class="tips-txt">' + str + '</span>';
  timer = setTimeout(function () {
    $tips.style.opacity = '0';
    $tips.innerHTML = '';
  }, 2000);
};

// 分享
(function () {
  var shareChannel = {
    'qq': 'QQ',
    'qzone': 'QQ空间',
    'tSina': '新浪',
    'weixin': '微信',
    'weixinGroup': '微信朋友圈',
    'message': '短信'
  };
  var shareType = ['link', 'music'];
  var html = [];
  for (var channel in shareChannel) {
    html.push('<p class="desc">分享【' + shareType.join('、') + '】到【' + shareChannel[channel] + '】</p>' + '<div class="col-2"><button id="multiShare-' + channel + '-' + shareType[0] + '" class="btn btn-primary">' + shareType[0] + '</button>' + '<button id="multiShare-' + channel + '-' + shareType[1] + '" class="btn btn-primary">' + shareType[1] + '</button><div>');
  }
  el('#multiShare').innerHTML += html.join('\n');
})();



ya.onReady(function () {
  ya.toast('onready');
});

// 获取设备信息
el('#device').onclick = function () {
  alert(JSON.stringify(ya.device));
};

// toast提示
el('#toast').onclick = function () {
  ya.toast('toast提示');
};

// 关闭webview
el('#closeWebView').onclick = function () {
  ya.closeWebView();
};

// 登录接口
// 1、登录状态下，返回登录信息，
// 2、未登录状态下，跳转登录页（回调不会执行）
el('#login').onclick = function () {
  alert(ya);
  ya.login(function (res) {
    alert(JSON.stringify(res));
  });
};

// 分享接口
el('#multiShare').onclick = function (e) {
  var el = e.target;
  var att = el.id.split('-');

  if (att.length < 3) return;

  ya.toast(el.id);

  var channel = att[1];
  var type = att[2];
  var linkUrl = 'http://www.ximalaya.com/1315711/sound/19976104';
  var dataUrl = '';

  // 如果是声音分享到新浪微博
  // 分享到新浪微博 不判断dataUrl
  if (channel == 'tSina') {
    if(type == 'music') {
      linkUrl = 'http://www.ximalaya.com/thirdparty/linkcard/7801955';
    }
  }
  else{
    if (type == 'music') {
      dataUrl = 'http://audio.xmcdn.com/group20/M0B/95/69/wKgJLFexhpezbxt8AIjBPJ6ev40085.m4a';
    }
  }

  ya.multiShare({
    channel: channel,
    title: channel + '-' + type,
    desc: channel + '-' + type + ' test~！#喜马拉雅#',
    link: linkUrl,
    imgUrl: 'http://fdfs.xmcdn.com/group17/M06/96/91/wKgJKVexhljjCyxYAAebo16E6Yw923_mobile_large.jpg',
    type: type,
    dataUrl: dataUrl
  }, function (res) {
    // 成功
    if (res.ret == 0) {
      alert(JSON.stringify('分享到【' + channel + '】成功！'));
    } else {
      alert(res.msg);
    }
  });

};

// 录音
var recordLocalId = ''; //  录音localId
(function () {
  // 录音状态
  var recordStatus = {
    READY: 0, // 准备
    RECORDING: 1, // 录音中
    PAUSED: 2, // 暂停录音
    STOP: 3, // 停止录音
    PLAYING: 4, // 播放
    PLAYPAUSED: 5, // 暂停播放
    PALYSTOP: 6, // 播放停止
    ERROR: 7 // 错误
  };
  var voiceStatus = recordStatus.READY; //  录音状态
  var playStatus = 0; //  播放状态
  var $record = el('#record'); // 录音按钮
  var $againRecord = el('#againRecord'); // 重录按钮
  var $stopRecord = el('#stopRecord'); // 停止按钮
  var $voicePanel = el('#voice-wrapper'); // 播放面板
  var $voice = el('#voice'); // 播放按钮
  var $againVoice = el('#againVoice'); // 再次播放按钮
  var $stopVoice = el('#stopVoice'); // 停止播放按钮

  var recordSet = function (el) {
    show($againRecord);
    show($stopRecord);
    show($voicePanel);
  };

  // 录音
  $record.onclick = function (e) {
    switch (voiceStatus) {
    case recordStatus.READY:
      recordSet(this);
      ya.recorder.startRecord(function () {
        ya.toast('开始录音：');
      });
      break;
    case recordStatus.RECORDING:
      // this.innerHTML = '继续';
      ya.recorder.pauseRecord(function (localId) {
        recordLocalId = localId;
        ya.toast('暂停录音：' + localId);
      });
      show($againRecord);
      show($stopRecord);
      show($voicePanel);
      break;
    case recordStatus.PAUSED:
      if (!recordLocalId) {
        alert('请先录制一段音频！');
        return;
      }
      recordSet(this);
      ya.recorder.resumeRecord(recordLocalId, function (localId) {
        ya.toast('恢复录音:' + localId);
      });
      break;
    case recordStatus.STOP:
      if (!recordLocalId) {
        alert('请先录制一段音频！');
        return;
      }
      recordSet(this);
      ya.recorder.startRecord(function () {
        ya.toast('开始录音：');
      });
      break;
    }
  };

  // 播放
  $voice.onclick = function (e) {
    if (!recordLocalId) {
      alert('请先录制一段音频！');
      return;
    }
    switch (playStatus) {
    case recordStatus.PLAYING:
      ya.recorder.pauseVoice(recordLocalId, function (localId) {
        ya.toast('暂停播放:' + localId);
      });
      break;
    case recordStatus.PLAYPAUSED:
      ya.recorder.resumeVoice(recordLocalId, function (localId) {
        ya.toast('恢复播放:' + localId);
      });
      break;
    case recordStatus.PALYSTOP:
      ya.recorder.playVoice(function (localId) {
        ya.toast('开始播放: ' + localId);
      });
      show($againVoice);
      show($stopVoice);
      break;
    case recordStatus.ERROR:
      break;
    default:
      ya.recorder.playVoice(function (localId) {
        ya.toast('开始播放: ' + localId);
      });
      show($againVoice);
      show($stopVoice);
    }
  };

  // 重新录音
  $againRecord.onclick = function (e) {
    recordSet($record);
    ya.recorder.startRecord(function () {
      ya.toast('开始录音');
    });
  };

  // 停止录音
  $stopRecord.onclick = function (e) {
    ya.recorder.stopRecord(function (localId) {
      recordLocalId = localId;
      ya.toast('停止录音:' + localId);
    });
    hide($againRecord);
    hide($stopRecord);
    show($voicePanel);
  };

  // 重新播放
  $againVoice.onclick = function (e) {
    if (!recordLocalId) {
      alert('请先录制一段音频！');
      return;
    }
    // $voice.innerHTML = '暂停';
    ya.recorder.playVoice(function (localId) {
      ya.toast('开始播放: ' + localId);
    });
  };

  // 停止播放
  $stopVoice.onclick = function (e) {
    if (!recordLocalId) {
      alert('请先录制一段音频！');
      return;
    }
    ya.recorder.stopVoice(function (localId) {
      ya.toast('停止播放:' + localId);
    });
    hide($againVoice);
    hide($stopVoice);
  };

  el('#uploadVoice').onclick = function (e) {
    ya.recorder.uploadVoice(recordLocalId, function (res) {
      var obj = JSON.parse(res);
      // 成功
      if (obj.ret == 0) {
        alert('成功：' + JSON.stringify(obj.data));
      } else {
        alert('失败：' + JSON.stringify(obj));
      }
    });
  };

  ya.recorder.bind({
    onRecordStart: function (milliseconds) {
      $record.innerHTML = '暂停';
      voiceStatus = recordStatus.RECORDING;
      tips('录音开始:' + milliseconds);
    },
    onRecording: function (milliseconds) {
      // 避免用toast，会产生toast延迟
      // ya.toast();
      tips('录音中:' + milliseconds);
    },
    onRecordPause: function (milliseconds) {
      $record.innerHTML = '继续';
      voiceStatus = recordStatus.PAUSED;
      tips('录音暂停:' + milliseconds);
    },
    onRecordResume: function (milliseconds) {
      $record.innerHTML = '暂停';
      voiceStatus = recordStatus.RECORDING;
      tips('录音恢复:' + milliseconds);
    },
    onRecordEnd: function (obj) {
      $record.innerHTML = '重录';
      voiceStatus = recordStatus.STOP;
      tips('录音结束:' + JSON.stringify(obj));
    },
    onPlayStart: function (obj) {
      $voice.innerHTML = '暂停';
      playStatus = recordStatus.PLAYING;
      tips('播放开始:' + JSON.stringify(obj));
    },
    onPlaying: function (obj) {
      // 避免用toast，会产生toast延迟
      tips('播放中:' + JSON.stringify(obj));
    },
    onPlayPause: function (obj) {
      $voice.innerHTML = '播放';
      playStatus = recordStatus.PLAYPAUSED;
      tips('暂停:' + JSON.stringify(obj));
    },
    onPlayResume: function (obj) {
      $voice.innerHTML = '暂停';
      playStatus = recordStatus.PLAYING;
      tips('恢复播放:' + JSON.stringify(obj));
    },
    onPlayEnd: function (obj) {
      $voice.innerHTML = '播放';
      playStatus = recordStatus.PLAYPEND;
      tips('播放结束:' + JSON.stringify(obj));
    }
  });

})();
