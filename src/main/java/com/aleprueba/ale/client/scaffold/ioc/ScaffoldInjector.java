package com.aleprueba.ale.client.scaffold.ioc;

import com.aleprueba.ale.client.scaffold.ScaffoldApp;
import com.google.gwt.inject.client.Ginjector;

public interface ScaffoldInjector extends Ginjector {

	ScaffoldApp getScaffoldApp();
}
