package com.aleprueba.ale.client.managed.activity;

import com.aleprueba.ale.client.managed.request.ApplicationRequestFactory;
import com.aleprueba.ale.client.managed.request.ModelProxy;
import com.aleprueba.ale.client.managed.request.ModelRequest;
import com.aleprueba.ale.client.managed.ui.ModelDetailsView;
import com.aleprueba.ale.client.managed.ui.ModelEditView;
import com.aleprueba.ale.client.managed.ui.ModelListView;
import com.aleprueba.ale.client.managed.ui.ModelMobileDetailsView;
import com.aleprueba.ale.client.managed.ui.ModelMobileEditView;
import com.aleprueba.ale.client.scaffold.ScaffoldApp;
import com.aleprueba.ale.client.scaffold.place.CreateAndEditProxy;
import com.aleprueba.ale.client.scaffold.place.FindAndEditProxy;
import com.aleprueba.ale.client.scaffold.place.ProxyPlace;
import com.google.gwt.activity.shared.Activity;
import com.google.gwt.place.shared.PlaceController;
import com.google.gwt.requestfactory.shared.EntityProxyId;
import com.google.gwt.requestfactory.shared.RequestContext;

public class ModelActivitiesMapper {

    private final ApplicationRequestFactory requests;

    private final PlaceController placeController;

    public ModelActivitiesMapper(ApplicationRequestFactory requests, PlaceController placeController) {
        this.requests = requests;
        this.placeController = placeController;
    }

    public Activity getActivity(ProxyPlace place) {
        switch(place.getOperation()) {
            case DETAILS:
                return new ModelDetailsActivity((EntityProxyId<ModelProxy>) place.getProxyId(), requests, placeController, ScaffoldApp.isMobile() ? ModelMobileDetailsView.instance() : ModelDetailsView.instance());
            case EDIT:
                return makeEditActivity(place);
            case CREATE:
                return makeCreateActivity();
        }
        throw new IllegalArgumentException("Unknown operation " + place.getOperation());
    }

    @SuppressWarnings("unchecked")
    private EntityProxyId<com.aleprueba.ale.client.managed.request.ModelProxy> coerceId(ProxyPlace place) {
        return (EntityProxyId<ModelProxy>) place.getProxyId();
    }

    private Activity makeCreateActivity() {
        ModelEditView.instance().setCreating(true);
        final ModelRequest request = requests.modelRequest();
        Activity activity = new CreateAndEditProxy<ModelProxy>(ModelProxy.class, request, ScaffoldApp.isMobile() ? ModelMobileEditView.instance() : ModelEditView.instance(), placeController) {

            @Override
            protected RequestContext createSaveRequest(ModelProxy proxy) {
                request.persist().using(proxy);
                return request;
            }
        };
        return new ModelEditActivityWrapper(requests, ScaffoldApp.isMobile() ? ModelMobileEditView.instance() : ModelEditView.instance(), activity, null);
    }

    private Activity makeEditActivity(ProxyPlace place) {
        ModelEditView.instance().setCreating(false);
        EntityProxyId<ModelProxy> proxyId = coerceId(place);
        Activity activity = new FindAndEditProxy<ModelProxy>(proxyId, requests, ScaffoldApp.isMobile() ? ModelMobileEditView.instance() : ModelEditView.instance(), placeController) {

            @Override
            protected RequestContext createSaveRequest(ModelProxy proxy) {
                ModelRequest request = requests.modelRequest();
                request.persist().using(proxy);
                return request;
            }
        };
        return new ModelEditActivityWrapper(requests, ScaffoldApp.isMobile() ? ModelMobileEditView.instance() : ModelEditView.instance(), activity, proxyId);
    }
}
