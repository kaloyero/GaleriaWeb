package com.aleprueba.ale.client.scaffold;

import com.aleprueba.ale.client.scaffold.ioc.DesktopInjectorWrapper;
import com.aleprueba.ale.client.scaffold.ioc.InjectorWrapper;
import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;

/**
 * Application for browsing entities.
 */
public class Scaffold implements EntryPoint {
	final private InjectorWrapper injectorWrapper = GWT.create(DesktopInjectorWrapper.class);

	public void onModuleLoad() {
		/* Get and run platform specific app */

		injectorWrapper.getInjector().getScaffoldApp().run();
	}
}