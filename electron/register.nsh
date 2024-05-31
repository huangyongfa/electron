!macro customInstall
  DetailPrint "Register iMinRemoteExe URI Handler"
  DeleteRegKey HKCR "iMinRemoteExe"
  WriteRegStr HKCR "iMinRemoteExe" "" "URL:iMinRemoteExe"
  WriteRegStr HKCR "iMinRemoteExe" "URL Protocol" ""
  WriteRegStr HKCR "iMinRemoteExe\shell" "" ""
  WriteRegStr HKCR "iMinRemoteExe\shell\Open" "" ""
  WriteRegStr HKCR "iMinRemoteExe\shell\Open\command" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME} %1"
!macroend

!macro customUnInstall
  DeleteRegKey HKCR "iMinRemoteExe"
!macroend
