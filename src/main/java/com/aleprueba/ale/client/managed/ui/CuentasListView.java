package com.aleprueba.ale.client.managed.ui;

import com.aleprueba.ale.client.managed.request.CuentasProxy;
import com.aleprueba.ale.client.managed.ui.CuentasListView.Binder;
import com.aleprueba.ale.client.scaffold.place.AbstractProxyListView;
import com.google.gwt.core.client.GWT;
import com.google.gwt.i18n.client.DateTimeFormat;
import com.google.gwt.i18n.client.NumberFormat;
import com.google.gwt.text.client.DateTimeFormatRenderer;
import com.google.gwt.text.shared.AbstractRenderer;
import com.google.gwt.text.shared.Renderer;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.user.cellview.client.CellTable;
import com.google.gwt.user.cellview.client.HasKeyboardSelectionPolicy.KeyboardSelectionPolicy;
import com.google.gwt.user.cellview.client.TextColumn;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.HTMLPanel;
import java.util.HashSet;
import java.util.Set;

public class CuentasListView extends CuentasListView_Roo_Gwt {

    private static final Binder BINDER = GWT.create(Binder.class);

    private static com.aleprueba.ale.client.managed.ui.CuentasListView instance;

    @UiField
    Button newButton;

    public CuentasListView() {
        init(BINDER.createAndBindUi(this), table, newButton);
        table.setKeyboardSelectionPolicy(KeyboardSelectionPolicy.DISABLED);
        init();
    }

    public static com.aleprueba.ale.client.managed.ui.CuentasListView instance() {
        if (instance == null) {
            instance = new CuentasListView();
        }
        return instance;
    }

    public String[] getPaths() {
        return paths.toArray(new String[paths.size()]);
    }

    interface Binder extends UiBinder<HTMLPanel, CuentasListView> {
    }
}
