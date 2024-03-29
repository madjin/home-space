# Home Space

An open source alternative to SteamVR / Oculus Home that you can own!

![](https://i.imgur.com/K0vf2rD.jpg)

[**Startpage demo**](https://madjin.github.io/startpage/) / [**Home Space demo**](http://home.hackerlab.eth.link/) [WIP] 

## Features

- Modular shipping container design to be portable
- Launch your favorite apps, including VR experiences
- JanusVR version 
- Unity project files
- glTF 2.0 files
- Spoke project files for Hubs (coming soon)

---

## Installation

There's an order if you want to be on the bleeding edge of a metaverse onboarding experience.

![](https://i.imgur.com/44jcBZL.jpg)

#### Requirements

**VRChat**

[Setting up SDK](https://docs.vrchat.com/docs/setting-up-the-sdk)

**JanusVR**

Setting up your home space (coming soon)

**Hubs**

Using Spoke to create a Home Space (coming soon)

---

### 0. :computer: Hosting

Where is your Home Space being hosted? There are advantages to using a combination of hosting methods to adhere to different needs and use-cases.

It's recommended to have a local offline version of your startpage or Home Space for the fastest speeds. One option is to host with a singleboard PC like a [Raspberry Pi](https://www.raspberrypi.org/) and web server software such as [Apache](https://www.raspberrypi.org/documentation/remote-access/web-server/apache.md) or [Nginx](https://www.raspberrypi.org/documentation/remote-access/web-server/nginx.md) over the local area network. 

Alternatively you can use newer protocols such as [IPFS](https://ipfs.io) or [dat](https://dat.foundation/) to serve your Home Space over peer-to-peer networks for a true off-the-grid experience.


### 1. :door: Startpage

This is the 2D front-door to your virtual home, typically presented as a new tab page or also known as a [homepage](https://en.wikipedia.org/wiki/Home_page). It is recommended to install a custom 2D [Startpage](https://github.com/madjin/startpage) and use that as your launcher into the WebXR home space. Remember to set the new default home page in your preferred web browser of choice to this startpage so that you can easily jump back to it.

<a href="https://github.com/madjin/startpage">
  <img alt="startpage1" target="_blank" src="https://i.imgur.com/5NCn5zN.jpg" height="190" width="32%">
</a>
<a href="https://github.com/Ozencb/tilde-enhanced">
  <img alt="tilde" target="_blank" src="https://i.imgur.com/k7kS2Q8.jpg" height="190" width="32%">
</a>
<a href="https://github.com/linuxserver/Heimdall">
  <img alt="Heimdall" target="_blank" src="https://i.imgur.com/XatmmTl.jpg" height="190" width="32%">
</a>

You can find many great customizable startpages here <https://startpages.github.io/> or on Github <https://github.com/search?q=startpage>.

The last step here is to point the homepage button and/or new tab page on your browser to the new startpage from the settings. If you're on a chrome based browser like Chrome, Chromium, or Brave, you must first enable the Home button by going to `chrome://settings/`.

### 2. :house: Home Space 

This is the equivalent of Oculus / Steam / Windows Mixed Reality home but more customizable since its open source and using open web standards. Here's a few sample virtual home space templates:

<a href="https://github.com/madjin/home-space">
  <img alt="Container" target="_blank" src="https://i.imgur.com/GQO4lV3.jpg" height="190" width="32%">
</a>
<a href="https://github.com/madjin/anime-room">
  <img alt="Anime" target="_blank" src="https://i.imgur.com/8S1ide8.jpg" height="190" width="32%">
</a>
<a href="https://github.com/madjin/tuscany">
  <img alt="Tuscany" target="_blank" src="https://i.imgur.com/NQuHts3.jpg" height="190" width="32%">
</a>

### 3. :bridge_at_night: The Street

Choose where you place your Home Space in the metaverse. You can create a federated network of linked virtual worls with your friends, purchase virtual property on platforms like in the case of [Cryptovoxels](https://www.cryptovoxels.com) and [Decentraland](https://decentraland.org), or just host on your own local grid. The exit portal is defined on line _ in the [JML]() for the container home.


<a href="https://github.com/janusvr-examples/desert">
  <img alt="JanusWeb" target="_blank" src="https://i.imgur.com/W5F9qE5.jpg" height="190" width="32%">
</a>
<a href="https://www.cryptovoxels.com/">
  <img alt="Cryptovoxels" target="_blank" src="https://i.imgur.com/IlcKVCk.jpg" height="190" width="32%">
</a>
<a href="https://decentraland.org">
  <img alt="Decentraland" target="_blank" src="https://i.imgur.com/ZCyYq3s.jpg" height="190" width="32%">
</a>

### 4. :stars: The Metaverse

In short, [the Metaverse](https://en.wikipedia.org/wiki/Metaverse) is the next major iteration of the Internet, a global computer network consisting of billions of electronic devices and interconnected networks using standardized communication protocols. The current Web sits as the leading information retrieval service, giving users access to a vast array of online content by means of hypertext, hypermedia, and hyperlinks formatted in HTML and served through HTTP.

<a href="https://i.imgur.com/TzR5qSI.jpg">
  <img alt="wWW" target="_blank" src="https://i.imgur.com/TzR5qSI.jpg" height="420" width="49%">
</a>
<a href="https://www.augmentedperception.com/">
  <img alt="Federated" target="_blank" src="https://i.imgur.com/D98s2Eb.gif" height="420" width="49%">
</a>

In the next decade we'll have new interfaces that see and interact in this virtual shared universe of unlimited possibility as well as new protocols to optimize the delivery of experiences. 

---


## To-Do

- [x] Setup demo site for Startpage + Home Space
- [x] Add more content for hosting options
- [ ] Instructions for Janus Home
- [ ] Instructions for setting up VRChat Home
- [ ] Update VRChat and Janus projects to new version
- [ ] Spoke project files for Hubs
- [x] Release new templates (Anime room, Tuscany, ...)
- [ ] Roadmap?
- [ ] Finish video trailer

---

Big thanks to [AnaGameDev](http://www.pixelripped.com/about/) for the hackerspace model and game within a game inspiration.
