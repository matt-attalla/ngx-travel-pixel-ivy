<p align="center">
  An Angular version 16+ library that compiles with Ivy to track Ecommerce and Travel Facebook Pixel Events. It also includes the `eventId` property to deduplicate events on the Facebook Events Manager.
</p>

<p align="center">
  This project is built ontop of Niels Kersic's [niels.codes](https://niels.codes) [ngx-pixel](https://www.npmjs.com/package/ngx-pixel) project.
</p>

---

# Introduction
Using a Facebook Pixel is fairly simple. You add the script to the `head` section of all pages, after which you can use the `fbq` function. However, in Angular it's not as straight-forward. The main two problems are as follows:

- Navigation using the Angular Router is not tracked.
- There are no TypeScript definitions by default, so no Intellisense or linting.

***ngx-pixel*** solves both of these issues. It adds a service that can be used in any component to track events and when enabled, it automatically tracks page views for each router navigation. 

By default, ***ngx-pixel*** is **disabled** to make it easier to comply with GDPR and other privacy regulations. The Facebook script is only loaded after ***ngx-pixel*** is enabled, which also helps cut down the initial load time of your application. Read [here](#enabling) how to *enable* and *disable* ***ngx-pixel***.

---

# Usage
Using ***ngx-pixel*** is very simple.

## 1. Installing the NPM package
You can install the NPM package with `npm install ngx-pixel`

## 2. Add it to your app module
Add the library to your app's module, usually `app.module.ts`. Make sure you use the `forRoot()` method. Within this method, add your [Facebook Pixel ID](https://www.facebook.com/business/help/952192354843755). 
```typescript
import { PixelModule } from 'ngx-pixel';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PixelModule.forRoot({ enabled: true, pixelId: 'YOUR_PIXEL_ID' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
**NOTE:** By default, the library does not start tracking immediately. In most cases this requires user consent to comply with GDPR and other privacy regulations. If you would still like start tracking as soon as your app module loads, include the `enabled: true` parameter in when you call `forRoot()`.

## 3. Add it to your components
In any component where you would like to track certain events, you can import the ***ngx-pixel service*** with `import { PixelService } from 'ngx-pixel';`
Then you can inject the service into your component as follows:
```TypeScript
export class HomeComponent {

  constructor(
    private pixel: PixelService
  ) { }

}
```

## 4. Tracking events
There are two groups of events that you can track, namely *Standard events*  and *Custom events*. 

### Standard events
**Standard events** are common events that Facebook has created. You can find the full list [here](https://developers.facebook.com/docs/facebook-pixel/reference).

The first argument is the type of event as defined by Facebook. The optional second argument can be used to pass more information about the event. E.g.: 
```typescript
this.pixel.track('InitiateCheckout', {
  content_ids: ['ABC123', 'XYZ456'],  // Item SKUs
  value: 100,                         // Value of all items
  currency: 'USD'                     // Currency of the value
});
```

### Custom events
Tracking **Custom events** works very similar to tracking Standard events. The only major difference is that there are no TypeScript interfaces and therefore no Intellisense. This is because the event *name* and optional *properties* can be anything. Tracking a custom event with ***ngx-pixel*** looks like this:
```TypeScript
this.pixel.trackCustom('MyCustomEvent');
```

And just like with Standard events, you can add more properties. This is recommended, since this enables you to create even more specific audiences within Facebook Business Manager. Which properties you add is completely up to you. Here is an example:
```TypeScript
this.pixel.trackCustom('MyCustomEvent', {
  platform: 'limewire'
})
```
### Flight Events
Tracking Flight Events are the same way as tracking any of the other standard events. In fact, Facebook recommends sending the `Search`, `ViewContent`, `InitateCheckout`, and `Purchase` events with just fields specific to the following events.

More information regarding the parameters for specific flight events can be found [here](https://www.facebook.com/business/help/2522836671061789)

## 5. Handling Duplicate Pixel and Conversions API Events

If you're making API calls to the Facebook Conversions API along with sending events via the facebook pixel, the "redundant setup" that facebook recommends, you're going to need to deduplicate your events so you dont get duplicate events being tracked in your facebook events manager.

Details about this recommended approach can be found [here](https://developers.facebook.com/docs/marketing-api/conversions-api/guides/end-to-end-implementation#pick-your-integration-type).

In order to deduplicate your events, you're going to need to send the same `eventID` and `event` name from the facebook pixel. Sending the event name is the same as any other tracking call but here is how you send the `eventID`:

**Standard events** 
```typescript
this.pixel.track("InitiateCheckout", 
{
  content_ids: ["ABC123", "XYZ456"], // Item SKUs
  value: 100, // Value of all items
  currency: "USD", // Currency of the value
}, 
{ 
  eventID: "123" //eventID to send to facebook to deduplicate events
});
```

**Custom events** 
```TypeScript
this.pixel.trackCustom('MyCustomEvent', {
  platform: 'limewire',
},
{ 
  eventID: "123" //eventID to send to facebook to deduplicate events
})
```

---

# Enabling and disabling ***ngx-pixel*** <a name="enabling"></a>
***ngx-pixel*** is disabled by default. In many cases, tracking without user consent is not allowed by privacy regulations like the European GDPR. ***ngx-pixel*** also doesn't inject the Facebook scripts until it is iniaitlized (upon consent), which helps cut down the initial loading size and time of your application.

## Enabling ***ngx-pixel*** immediately
It is still possible to initialize ***ngx-pixel*** as soon as your app module loads.
When adding ***ngx-pixel*** to `app.module.ts`, add the parameter `enabled: true`.
```TypeScript
imports: [
  BrowserModule,
  PixelModule.forRoot({ enabled: true, pixelId: 'YOUR_PIXEL_ID'})
],
```

## Enabling ***ngx-pixel*** from a component
You can also enable ***ngx-pixel*** from within any of your components, like so:
```TypeScript
export class HomeComponent {

  constructor(
    private pixel: PixelService
  ) { }

  onConsent(): void {
    this.pixel.initialize();
  }

}
```

## Enabling with a dynamic Pixel ID
In situations where the Pixel ID needs to be changed dynamically, this can be done using `initialize()` with the new Pixel ID as an optional argument. 
**Notes:** 
- A Pixel ID still needs to be provided when importing ***ngx-pixel*** in the module.
- The previous instance should be removed with `remove()` before initializing a new Pixel ID. 
- This approach should **not** be used in combination with serverside rendering (SSR). As the module is initialized on each request, the Pixel script will default to the ID provided in the module.  


## Disabling ***ngx-pixel***
Disabling works very similar to *enabling* from within a component and looks like this:
```TypeScript
export class HomeComponent {

  constructor(
    private pixel: PixelService
  ) { }

  onRevokeConsent(): void {
    this.pixel.remove();
  }

}
```

---

# Important notes
- Backwards compatibility is not guaranteed. ***ngx-pixel*** was developed using Angular 11, which uses the Ivy compiler instead of the older View Engine compiler. If your project uses Angular 8 or earlier, or if you've decided to keep using View Engine with newer Angular versions, ***ngx-pixel*** might not be compatible, although I have not yet tested this to confirm.