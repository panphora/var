visit /
  generate html based on template
  redirects to unique route
  renders html
  save auth cookie
with auth cookie
  you can edit html
without auth cookie
  you can only view html
changing html
  saves html over current html
send message to page id
  message
    subject
      any utf8 string
    message
      any utf8 string
    action
      only one type of action: appendToBody
    code
      can be any front-end JS
  owner of page receives message from a wormhole-looking widget
    they can accept, reject, or read message
      reading message opens up the message in a separate page as a JS file
other
  remove html cache: https://github.com/helmetjs/nocache